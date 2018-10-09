require('dotenv').config()
const admin = require('firebase-admin');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

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
    let artist = '';
    let name = '';
    let urls = [];
    let spotify_url = '';
    let bandcamp_url = '';
    let song_url = '';
    if ('artista' in song.data) {
      artist = song.data['artista']._referencePath.segments;
    }
    if ('nombre' in song.data) {
      name = song.data.nombre;
    }
    if ('url' in song.data) {
      urls = song.data.url;
    }
    urls.forEach((link) =>{
      if(link.match(/spotify/)){
        spotify_url = link
      } else if(link.match(/bandcamp/)){
        bandcamp_url = link
      }
    });
    song_url = spotify_url !== '' ? spotify_url : bandcamp_url;
    return song_url;
  })
  .then((song_url) => {
    client.post('statuses/update', {status: `Recomendación Diaria 🎶 🇨🇷 ${song_url}`})
    .then(function (tweet) {
      console.log(tweet);
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
