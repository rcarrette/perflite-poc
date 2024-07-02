import fs from 'fs';

const credentials = {
    "type": "service_account",
    "project_id": "perflite-poc",
    "private_key_id": "cec6158aa64b5d7ef4db2a82dbc1646d4c81f2fe",
    "private_key": process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    "client_email": "appflow-web-deployer@perflite-poc.iam.gserviceaccount.com",
    "client_id": "118346947626031114243",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/appflow-web-deployer%40perflite-poc.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};

fs.writeFileSync('./firebase-key.json', JSON.stringify(credentials, null, 2));