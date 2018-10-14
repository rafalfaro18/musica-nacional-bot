# musica-nacional-bot
Bot de recomendaciones de música de Costa Rica

## Requerimientos

- Poner los credenciales de Twitter Developer App en un archivo .env así [env.example](env.example)
- Poner los credenciales .json de firestore cloud server en un archivo llamado 'key.json'. Su contenido es como este [key.json.example](key.json.example)
- Base de datos en firebase cloud con una colección (no vacia) llamada 'canciones'.
- Cada documento de la colección 'canciones' como mínimo debe tener un ID, un Nombre y un array de urls con una url de la cancion en spotify y(o) una url de la cancion en bandcamp como en la siguiente estructura:
```json
{
  "unID": {
    "nombre": "unNombre",
    "url": [
      "https://avenegra.bandcamp.com/track/ave-negra",
      "https://open.spotify.com/track/0iN5jZY8G5viGqYVwolw86?si=IoasAjVSSsShlHbt6Z78-Q"
    ]
  }
}
```
- Cada canción puede tener un campo 'artista' de tipo referencia a un documento de una colección llamada 'artistas'.
- Cada documento de la colección 'artistas' debe tener como mínimo un ID y opcionalmente un campo 'twitter_handle' con el nombre de usuario de twitter sin la @:
```json
{
  "unID": {
    "twitter_handle": "unUsuarioDeTwitter"
  }
}
```

## Notas
- El bot solo publica el tweet si cumple lo siguiente:
  - El ultimo tweet publicado por la cuenta asociada a los credenciales en el archivo .env no comienza con 'Recomendación Diaria' y la hora en que se ejecutó el bot está entre las 7am y 9am.
  - El ultimo tweet publicado por la cuenta asociada a los credenciales en el archivo .env comienza con 'Recomendación Diaria' y ya ha pasado un día o más.
