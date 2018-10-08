const admin = require('firebase-admin');

var serviceAccount = require('./key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const settings = {timestampsInSnapshots: true};
admin.firestore().settings(settings);

var db = admin.firestore();

db.collection('canciones').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
