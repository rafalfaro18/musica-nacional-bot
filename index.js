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
    const size = snapshot.size;
    const song_ids = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      song_ids.push(doc.id);
    });
    const randomIndex = Math.floor(Math.random() * size);
    console.log(song_ids[randomIndex]);
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
