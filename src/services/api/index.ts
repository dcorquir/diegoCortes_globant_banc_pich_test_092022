import 'graphql-import-node';
import cfg from '../../config/config';
import { makeSchema } from 'nexus';
import { NexusGraphQLSchema } from 'nexus/dist/core';
import { join } from 'path';
import Server from '../../config/server/server-class';

import * as typesCommon from './../../common/graphql/types-common';
import * as typesOut from './graphql/types/types.out';
// import * as typesIn from './graphql/types/types.in';
// import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';


const nexusSchema: NexusGraphQLSchema = makeSchema({
    types: [
        typesCommon, 
        typesOut, 
        queries
    ],
    outputs: {
        schema: join(process.cwd(), "schema.graphql"),
        typegen: join(process.cwd(), "nexus-typegen.ts"),
    }
});


const PORT = parseInt(`${cfg.microservice.api.port}`);
const server = Server.init(PORT, nexusSchema, cfg.microservice.api.context);

async function startServer() {
    await server.start(() => {
        console.log('🚀 API Server ready at',
            `${cfg.microservice.api.url}:${cfg.microservice.api.port}/graphql ready 🔥📌`
        );
    });
}

startServer();
