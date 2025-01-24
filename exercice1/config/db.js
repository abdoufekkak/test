const admin = require('firebase-admin');
const serviceAccount = require('../serviceAcountKey.json'); // Clé de service Firestore

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;
