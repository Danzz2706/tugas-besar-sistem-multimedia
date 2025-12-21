import { useState, useEffect } from 'react';
import type { Subject } from '../data/subjects';
import { subjectsData } from '../data/subjects';
import { collection, doc, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useSubjects = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const subjectsRef = collection(db, 'subjects');

        const unsubscribe = onSnapshot(subjectsRef, async (snapshot) => {
            try {
                const subjectsList: Subject[] = [];

                for (const docSnapshot of snapshot.docs) {
                    const subjectData = docSnapshot.data() as Omit<Subject, 'id' | 'modules'>;
                    const modulesRef = collection(db, 'subjects', docSnapshot.id, 'modules');
                    const modulesSnap = await getDocs(modulesRef);
                    const modules = modulesSnap.docs.map(m => m.data());

                    subjectsList.push({
                        id: docSnapshot.id,
                        ...subjectData,
                        modules: modules as any[]
                    } as Subject);
                }

                setSubjects(subjectsList);
                setLoading(false);
            } catch (err: any) {
                console.error("Error syncing subjects:", err);
                setError(err.message);
                setLoading(false);
            }
        }, (err) => {
            console.error("Snapshot Error:", err);
            setError(err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { subjects, loading, error };
};

export const useSubject = (subjectId?: string) => {
    const [subject, setSubject] = useState<Subject | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!subjectId) {
            setLoading(false);
            return;
        }

        const subjectRef = doc(db, 'subjects', subjectId);

        const unsubscribe = onSnapshot(subjectRef, async (docSnapshot) => {
            try {
                if (docSnapshot.exists()) {
                    const subjectData = docSnapshot.data() as Omit<Subject, 'id' | 'modules'>;
                    const modulesRef = collection(db, 'subjects', subjectId, 'modules');
                    const modulesSnap = await getDocs(modulesRef);
                    const modules = modulesSnap.docs.map(m => m.data());

                    setSubject({
                        id: docSnapshot.id,
                        ...subjectData,
                        modules: modules as any[]
                    } as Subject);
                    setError(null);
                } else {
                    if (subjectsData[subjectId]) {
                        setSubject(subjectsData[subjectId]);
                    } else {
                        setError("Subject not found");
                        setSubject(null);
                    }
                }
                setLoading(false);
            } catch (err: any) {
                console.error("Error syncing subject:", err);
                setError(err.message);
                setLoading(false);
            }
        }, (err) => {
            console.error("Subject Snapshot Error:", err);
            setError(err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [subjectId]);

    return { subject, loading, error };
};
