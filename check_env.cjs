const fs = require('fs');

if (fs.existsSync('.env')) {
    console.log('Found .env file');
    const content = fs.readFileSync('.env', 'utf-8');
    const lines = content.split('\n');
    const envConfig = {};
    lines.forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim();
            if (key && !key.startsWith('#')) {
                envConfig[key] = value;
            }
        }
    });

    const requiredKeys = [
        'VITE_FIREBASE_API_KEY',
        'VITE_FIREBASE_AUTH_DOMAIN',
        'VITE_FIREBASE_PROJECT_ID',
        'VITE_FIREBASE_STORAGE_BUCKET',
        'VITE_FIREBASE_MESSAGING_SENDER_ID',
        'VITE_FIREBASE_APP_ID'
    ];

    let missing = [];
    requiredKeys.forEach(key => {
        if (!envConfig[key] || envConfig[key].length === 0) missing.push(key);
    });

    if (missing.length > 0) {
        console.error('Missing keys in .env:', missing.join(', '));
    } else {
        console.log('All required keys check passed for frontend .env');
    }
} else {
    console.error('.env file not found in root');
}
