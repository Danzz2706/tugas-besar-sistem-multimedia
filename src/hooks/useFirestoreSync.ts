import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useFirestoreSync = () => {
    const { user, completedMaterials, studentRecords, setCompletedMaterials, setStudentRecords } = useStore();

    // 1. Load data from Firestore on login
    useEffect(() => {
        if (!user?.id) return;

        const loadUserData = async () => {
            try {
                const userRef = doc(db, 'users', user.id);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const data = userSnap.data();
                    console.log("Firestore User Data Loaded:", data);

                    if (data.completedMaterials) {
                        setCompletedMaterials(data.completedMaterials);
                    }
                    if (data.studentRecords) {
                        setStudentRecords(data.studentRecords);
                    }
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
                    completedMaterials,
                    studentRecords
                }, { merge: true });
                console.log("Synced to Firestore");
            } catch (error) {
                console.error("Error syncing to Firestore:", error);
            }
        };

        // Debounce sync to avoid too many writes
        const timeoutId = setTimeout(syncData, 1000);
        return () => clearTimeout(timeoutId);
    }, [completedMaterials, studentRecords, user?.id]);
};
