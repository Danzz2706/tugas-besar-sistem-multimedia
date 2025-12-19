import { useState, useEffect } from 'react';
import type { Subject } from '../data/subjects';
import { subjectsData } from '../data/subjects';

export const useSubjects = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                // Bypass API for now, use static data
                const subjectsArray = Object.values(subjectsData);
                setSubjects(subjectsArray);

                /* 
                // Original fetching logic
                const response = await fetch('http://localhost:5000/api/subjects');
                if (!response.ok) {
                    throw new Error(`API Error: ${response.statusText}`);
                }
                const data = await response.json();
                setSubjects(data);
                */

            } catch (err: any) {
                console.error("Error fetching subjects:", err);
                setError(err.message);
                setSubjects([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
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

        const fetchSubject = async () => {
            try {
                // Bypass API for now, use static data
                if (subjectsData[subjectId]) {
                    setSubject(subjectsData[subjectId]);
                } else {
                    throw new Error(`Subject not found`);
                }

                /*
                // Original fetching logic
                const response = await fetch(`http://localhost:5000/api/subjects/${subjectId}`);
                if (!response.ok) {
                    throw new Error(`Subject not found`);
                }
                const data = await response.json();
                setSubject(data);
                */

            } catch (err: any) {
                console.error("Error fetching subject:", err);
                setError(err.message);
                // Fallback
                if (subjectsData[subjectId]) {
                    setSubject(subjectsData[subjectId]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSubject();
    }, [subjectId]);

    return { subject, loading, error };
};
