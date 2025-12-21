import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

let db: admin.firestore.Firestore;

if (!admin.apps.length) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const serviceAccount = require(path.join(__dirname, '../../serviceAccountKey.json'));
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://aplkasi-web-interaktif-default-rtdb.asia-southeast1.firebasedatabase.app"
        });
        console.log('Firebase Admin Initialized');
    } catch (error) {
        console.warn('WARNING: serviceAccountKey.json not found or invalid. Firestore will not work.', error);
    }
}

db = admin.firestore();

export { admin, db };
