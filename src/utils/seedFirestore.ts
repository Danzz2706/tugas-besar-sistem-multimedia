import { doc, writeBatch } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { subjectsData } from "../data/subjects";

export const seedDatabase = async () => {
    try {
        if (!auth.currentUser) {
            alert("Error: You must be logged in to seed the database. Please waiting a few seconds for Firebase to initialize or re-login.");
            console.error("Seed failed: No authenticated user found in Firebase SDK.");
            return;
        }

        console.log("Starting seed as user:", auth.currentUser.uid);
        const batch = writeBatch(db);

        const subjectsList = Object.values(subjectsData);

        for (const subject of subjectsList) {
            // Subject Reference
            const subjectRef = doc(db, "subjects", subject.id);

            // Set Subject Data
            batch.set(subjectRef, {
                id: subject.id,
                name: subject.name,
                description: subject.description,
                iconName: subject.iconName
            });

            // Create Modules Sub-collection
            for (const module of subject.modules) {
                const moduleRef = doc(db, "subjects", subject.id, "modules", module.id);
                batch.set(moduleRef, {
                    id: module.id,
                    title: module.title,
                    materials: module.materials // Storing materials array inside module doc for simplicity
                });
            }
        }

        await batch.commit();
        console.log("Seeding complete!");
        alert("Database seeded successfully with latest content!");
    } catch (error) {
        console.error("Error seeding database:", error);
        alert("Failed to seed database. Check console.");
    }
};
