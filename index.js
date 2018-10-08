const admin = require('firebase-admin');

var serviceAccount = require('./key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const settings = {
  timestampsInSnapshots: true
};
admin.firestore().settings(settings);

var db = admin.firestore();

db.collection('canciones').get()
  .then((snapshot) => {
    const size = snapshot.size;
    const song_ids = [];
    const songs = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      songs[id] = {
        data: data
      };
      song_ids.push(doc.id);
    });
    const randomIndex = Math.floor(Math.random() * size);
    const randomId = song_ids[randomIndex];
    return songs[randomId];
  })
  .then((song) => {
    if ('artista' in song.data) {
      const artist = song.data['artista']._referencePath.segments;
      console.log(artist);
    }
    if ('nombre' in song.data) {
      const name = song.data.nombre;
      console.log(name);
    }
    if ('url' in song.data) {
      const url = song.data.url;
      console.log(url);
    }
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
