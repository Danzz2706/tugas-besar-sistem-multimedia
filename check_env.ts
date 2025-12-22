import dotenv from 'dotenv';
import fs from 'fs';

// Check root .env
if (fs.existsSync('.env')) {
    console.log('Found .env file');
    const envConfig = dotenv.parse(fs.readFileSync('.env'));
    const requiredKeys = [
        'VITE_FIREBASE_API_KEY',
        'VITE_FIREBASE_AUTH_DOMAIN',
        'VITE_FIREBASE_PROJECT_ID',
        'VITE_FIREBASE_STORAGE_BUCKET',
        'VITE_FIREBASE_MESSAGING_SENDER_ID',
        'VITE_FIREBASE_APP_ID'
    ];

    let missing: string[] = [];
    requiredKeys.forEach(key => {
        if (!envConfig[key]) missing.push(key);
    });

    if (missing.length > 0) {
        console.error('Missing keys in .env:', missing.join(', '));
    } else {
        console.log('All required keys check passed for frontend .env');
    }
} else {
    console.error('.env file not found in root');
}
