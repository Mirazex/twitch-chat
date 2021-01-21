# twitch-chat

### Server
- create .env file in `server` folder with config:
```
TWITCH_CLIENT_ID = your-twitch-application-client-id
TWITCH_SECRET_KEY = your-twitch-application-client-secret
```

- install dependencies (in `server` folder) and start
```bash
npm i
npm start
```


### Client

- create .env file in `client` folder with config:
```
BACKEND_URI = 'ws://localhost:5000/'
```

- install dependencies (in `client` folder) and start
```bash
npm i
npm start
```
