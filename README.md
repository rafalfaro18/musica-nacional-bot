# musica-nacional-bot
Bot de recomendaciones de música de Costa Rica

## Requerimientos

- Put your Twitter Developer App credentials in an .env file like [env.example](env.example)
- Put your firestore cloud server .json credentials in a file called key.json. The content is like [key.json.example](key.json.example)
- Base de datos en firebase cloud con una colección (no vacia) llamada 'canciones'.
- Cada documento de la colección 'canciones' como mínimo debe tener la siguiente estructura:
```json
{
	"someID": {
		"nombre": "someName",
		"url": [
			"https://avenegra.bandcamp.com/track/ave-negra",
			"https://open.spotify.com/track/0iN5jZY8G5viGqYVwolw86?si=IoasAjVSSsShlHbt6Z78-Q"
		]
	}
}
```
