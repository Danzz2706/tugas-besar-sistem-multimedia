import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { User, StudentRecord, UserRole } from '../store/useStore';

export interface StudentData extends User {
    studentRecords?: StudentRecord[];
    completedMaterials?: string[];
}

export const useStudents = () => {
    const [students, setStudents] = useState<StudentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('role', '==', 'student'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            try {
                const studentsList: StudentData[] = [];
                snapshot.forEach((doc) => {
                    // Combine basic user data with progress data that might be in the same doc
                    const data = doc.data();
                    studentsList.push({
                        id: doc.id,
                        name: data.name,
                        email: data.email,
                        role: data.role as UserRole,
                        avatar: data.avatar,
                        studentRecords: data.studentRecords || [],
                        completedMaterials: data.completedMaterials || []
                    });
                });
                setStudents(studentsList);
                setLoading(false);
            } catch (err: any) {
                console.error("Error fetching students:", err);
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

    return { students, loading, error };
};
