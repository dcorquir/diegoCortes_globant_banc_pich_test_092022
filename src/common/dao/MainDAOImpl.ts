import { IMainDAO } from './IMainDAO';
import { LoggerCfg } from './../../config/Logger';
import { injectable } from 'inversify';
import { PrismaClient } from '@prisma/client'

@injectable()
export class MainDAOImpl implements IMainDAO {

    private readonly connection: PrismaClient;
    private readonly LOGGER = LoggerCfg.getLogger();

    constructor() {
        try {
            this.connection = new PrismaClient();
            this.LOGGER.info("Connections and pools has been established successfully...")
        } catch (error) {
            this.LOGGER.error('ERROR - Unable to connect to the database:', error);
            throw error;
        }
    }

    public getConn(): PrismaClient {
        return this.connection;
    }
}
