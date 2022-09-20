import { PrismaClient } from '@prisma/client'

export interface IMainDAO {
    getConn(): PrismaClient;
}