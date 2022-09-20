# How to set local environment to run project develop

1. Use NodeJS version **16.14.0**

2. Create `.env` file on root and set values

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

## Whit NODEMON

### Micro service

1. npm install --legacy-peer-deps 
2. npm run prisma:generate
3. npm run generate:nexus
4. npm run start:d:**<ms_name: [auth | users]>**

```bash
npm install
npm run prisma:generate
npm run generate:nexus
npm run start:d:api
```

