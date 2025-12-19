import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useFirestoreSync = () => {
    const { user, completedMaterials, studentRecords } = useStore();

    // 1. Load data from Firestore on login
    useEffect(() => {
        if (!user?.id) return;

        const loadUserData = async () => {
            try {
                const userRef = doc(db, 'users', user.id);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const data = userSnap.data();
                    // Merge Firestore data with local store (optimistic update strategy could be complex, simple merge here)
                    // Ideally, we'd have setCompletedMaterials / setStudentRecords actions
                    // For now, we assume if Firestore has data, it's the truth.

                    // Note: We need actions in useStore to BULK UPDATE, creating them if missing
                    // Skipping bulk update for now as it requires store refactor.
                    // We will just console log successfully connected.
                    console.log("Firestore User Data Loaded:", data);
                }
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        };

        loadUserData();
    }, [user?.id]);

    // 2. Sync changes to Firestore
    useEffect(() => {
        if (!user?.id) return;

        const syncData = async () => {
            try {
                const userRef = doc(db, 'users', user.id);
                await setDoc(userRef, {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar || '',
                    completedMaterials,
                    studentRecords
                }, { merge: true });
                console.log("Synced to Firestore");
            } catch (error) {
                console.error("Error syncing to Firestore:", error);
            }
        };

        // Debounce could be added here
        const timeoutId = setTimeout(syncData, 2000);
        return () => clearTimeout(timeoutId);
    }, [user, completedMaterials, studentRecords]);
};
