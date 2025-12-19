import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');

let db: any;

try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const serviceAccount = require(serviceAccountPath);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    db = admin.firestore();
    console.log('Firebase Admin Initialized successfully.');
} catch (error) {
    console.warn('WARNING: serviceAccountKey.json not found. Using Mock InMemory DB for development.');

    // Mock DB Implementation for Development without Firebase Key
    class MockCollection {
        data: any[] = [];
        constructor() { this.data = []; }

        async add(doc: any) {
            const id = Math.random().toString(36).substring(7);
            this.data.push({ ...doc, id });
            return { id };
        }

        where(field: string, op: string, value: any) {
            const filtered = this.data.filter(d => d[field] === value); // Simple check
            return {
                get: async () => ({
                    empty: filtered.length === 0,
                    docs: filtered.map(d => ({
                        id: d.id,
                        data: () => d
                    }))
                }),
                limit: () => ({
                    get: async () => ({
                        empty: filtered.length === 0,
                        docs: filtered.map(d => ({
                            id: d.id,
                            data: () => d
                        }))
                    })
                })
            }
        }

        async get() {
            return {
                docs: this.data.map(d => ({ id: d.id, data: () => d }))
            }
        }
    }

    const collections: Record<string, MockCollection> = {};

    db = {
        collection: (name: string) => {
            if (!collections[name]) collections[name] = new MockCollection();
            return collections[name];
        }
    };
}

export { db };
