# musica-nacional-bot
Bot de recomendaciones de música de Costa Rica

## Requerimientos

- Put your Twitter Developer App credentials in an .env file like [env.example](env.example)
- Put your firestore cloud server .json credentials in a file called key.json. The content is like [key.json.example](key.json.example)
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
