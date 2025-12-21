import { useState } from 'react';
import { collection, doc, setDoc, deleteDoc, updateDoc, addDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Subject, Module, Material } from '../data/subjects';

export const useManageContent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // --- SUBJECTS ---
    const addSubject = async (subject: Omit<Subject, 'id' | 'modules'>) => {
        setLoading(true);
        try {
            // We use 'subjects' collection
            // ID can be auto-generated or slugified from name
            const id = subject.name.toLowerCase().replace(/\s+/g, '-');
            const subjectRef = doc(db, 'subjects', id);

            await setDoc(subjectRef, {
                ...subject,
                iconName: subject.iconName || 'BookOpen'
            });
            setLoading(false);
            return id;
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    const deleteSubject = async (subjectId: string) => {
        setLoading(true);
        try {
            await deleteDoc(doc(db, 'subjects', subjectId));
            setLoading(false);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    // --- MODULES ---
    const addModule = async (subjectId: string, moduleData: Omit<Module, 'id' | 'materials'>) => {
        setLoading(true);
        try {
            const modulesRef = collection(db, 'subjects', subjectId, 'modules');
            const newModuleRef = await addDoc(modulesRef, {
                title: moduleData.title,
                materials: [] // Start empty
            });
            setLoading(false);
            return newModuleRef.id;
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    const deleteModule = async (subjectId: string, moduleId: string) => {
        setLoading(true);
        try {
            await deleteDoc(doc(db, 'subjects', subjectId, 'modules', moduleId));
            setLoading(false);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    // --- MATERIALS ---
    const addMaterial = async (subjectId: string, moduleId: string, material: Material) => {
        setLoading(true);
        try {
            const moduleRef = doc(db, 'subjects', subjectId, 'modules', moduleId);
            await updateDoc(moduleRef, {
                materials: arrayUnion(material)
            });
            setLoading(false);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    // In a real app we'd need updateMaterial and removeMaterial which is harder with arrays (need read-modify-write)
    // For MVP we might just skip 'Edit Material' or assume we rewrite the whole module's material list.

    return {
        addSubject,
        deleteSubject,
        addModule,
        deleteModule,
        addMaterial,
        loading,
        error
    };
};
