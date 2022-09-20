var cors = require('cors');
var bodyParser = require('body-parser');

import { createServer } from 'http';
import path from 'path';
import compression from 'compression';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { APPLICATION_TYPES } from '../inversify/ApplicationTypes';
import { IMainDAO } from './../../common/dao/IMainDAO';
import { LoggerCfg } from '../Logger';
import { AppContainer } from './../inversify/InversifyConfig';
import { UserSessionDTO } from './../../services/api/dto/request/UserSessionDTO';
import { JwtUtils } from './../../utils/jwt-utils';

import { NexusGraphQLSchema } from 'nexus/dist/core';
import { PrismaClient } from '@prisma/client'


export default class Server {
    public app: express.Application;
    public port: number;
    private apolloServer: any;
    public server: any;
    private LOGGER = LoggerCfg.getLogger();
    private schema: NexusGraphQLSchema;

    constructor(port: number, schema: NexusGraphQLSchema) {
        this.port = port;
        this.app = express();
        this.app.use('*', cors());
        this.app.use(compression());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: '100mb' }));
        this.schema = schema;
        this.setApolloServer(this.app);
    }


    /**
     * Recursive method initialice server
     * @param port Number listen app on host
     */
    static init(port: number, schema: NexusGraphQLSchema, context: string) {
        LoggerCfg.initLogger(context);
        AppContainer.get<IMainDAO>(APPLICATION_TYPES.IMainDAO);
        return new Server(port, schema);
    }


    /**
     * Set public forlder
     */
    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }

    private async setApolloServer(app: express.Application) {

        this.server = createServer(app);

        let prisma_db = new PrismaClient();

        this.apolloServer = new ApolloServer({
            schema: this.schema,
            context(request: any) {
                let tokenDecrypt = JwtUtils.decodeJwt(request.req.headers.authorization);
                let availableToken = JwtUtils.isJwtAlive(tokenDecrypt);
                let ret: any = {
                    'token': request.req.headers.authorization,
                    'user_session': undefined,
                    'db': prisma_db
                }
                if (availableToken && tokenDecrypt) {
                    ret.user_session = tokenDecrypt as any;
                }
                return ret;
            },
            plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
        });
        await this.apolloServer.start();
        this.apolloServer.applyMiddleware({ app });
    }

    /**
     * Method started the server
     * @param callback Function to managment listenner server
     */
    async start(callback: (...args: any[]) => void) {
        this.server.listen(this.port, callback);
        this.publicFolder();
    }

    async closeServer() {
        this.server.close();
    }

    /**
     * 
     * @param token 
     * @returns 
     */
    async verifyAndInjectUserInRequest(token: string): Promise<UserSessionDTO> {
        return await JwtUtils.getUserSession(token);
    }

}