# How to set local environment to run project develop

1. Use NodeJS version **16.14.0**

2. Use Graphql and Apollo server with TypeScript [https://www.howtographql.com/typescript-apollo/0-introduction/](https://www.howtographql.com/typescript-apollo/0-introduction/)

3. Create `.env` file on root and set values

```env
URL_API =
PORT_API =
CONTEXT_API =

ENV_LOGGER_DIRECTORY =
ENV_LOGGER_LEVEL =
LOG_FILE_NAME =

# Full environment string connection
DATABASE_URL=mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${MS_DB_AUTH}
```

### Micro service

```bash
npm install --legacy-peer-deps
npm run start:d:api
```

### Docs Service and PlayGround

Una vez el proyecto esté levantado, es posible ingrsar al playground, de graphql, para probar los servicios y ver la documentacion de los mismos. accediendo a la ruta:

```env
http://localhost:3000/graphql
```

