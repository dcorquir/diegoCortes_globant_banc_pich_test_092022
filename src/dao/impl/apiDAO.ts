import "reflect-metadata";
import { inject, injectable } from 'inversify';
import { IMainDAO } from "./../../common/dao/IMainDAO";
import { IApiDAO } from './../interfaces/IapiDAO';
import { LoggerCfg } from './../../config/Logger';
import { APPLICATION_TYPES } from "../../config/inversify/ApplicationTypes";
import { IOrganizationCreate, IOrganization } from './../../services/api/dto/request/OrganizationDTO';
import { OrganizationMapper } from './../mapper/organization.mapper';
import { IBasicListResponseDTO } from './../../services/api/dto/responses/ResponseDTO';

@injectable()
export class ApiDAO implements IApiDAO {
    private readonly LOGGER = LoggerCfg.getLogger();
    private readonly prisma;
    private iMainDAO: IMainDAO;

    constructor(
        @inject(APPLICATION_TYPES.IMainDAO) mainDAO: IMainDAO,
    ) {
        this.iMainDAO = mainDAO;
        this.prisma = this.iMainDAO.getConn();
    }

    public async findOrganizationByName(name: string): Promise<IOrganization> {
        this.LOGGER.info(`[🔖💬][DAO][findOrganizationByName] - name: ${name}`);
        let org_found = null;
        try {
            let found = await this.prisma.organization.findFirst({
                where: {
                    name: name
                }
            });
            org_found = OrganizationMapper.GET_A_SINGLE_ORGANIZATION(found);
            this.LOGGER.info(`[🔖💬][DAO][findOrganizationByName] - found: ${org_found}`);
        } catch (error) {
            this.LOGGER.error(`|DB-EXCEPTION|[🐛🚨][findOrganizationByName] ${error} [💥]`);
        }
        return org_found as unknown as IOrganization;
    }

    public async createOrganization(data_organization: IOrganizationCreate): Promise<number> {
        this.LOGGER.info(`[🔖💬][DAO][createOrganization] - organization: ${JSON.stringify(data_organization)}`);
        try {
            let new_org = await this.prisma.organization.create({
                data: data_organization
            })
            return new_org.id_organization;
        } catch (error) {
            this.LOGGER.error(`|DB-EXCEPTION|[🐛🚨][createOrganization] ${error} [💥]`);
        }
        return 0;
    }

    public async updateOrganization(id: number, data_organization: IOrganizationCreate): Promise<number> {
        this.LOGGER.info(`[🔖💬][DAO][updateOrganization] - organization: ${JSON.stringify(data_organization)}`);
        try {
            let upd_org = await this.prisma.organization.update({
                where: {
                    id_organization: id
                },
                data: data_organization
            });
            return upd_org.id_organization;
        } catch (error) {
            this.LOGGER.error(`|DB-EXCEPTION|[🐛🚨][updateOrganization] ${error} [💥]`);
        }
        return 0;
    }

    public async getOrganizationsList(skip: number, limit: number): Promise<IBasicListResponseDTO> {
        this.LOGGER.info(`[🔖💬][DAO][getOrganizationsList] - skip: ${skip} - limit: ${limit}`);
        let resp: IBasicListResponseDTO = {data: [], total_records: 0};
        try {
            let data = await this.prisma.organization.findMany({
                where: {deleted: false},
                skip: skip,
                take: limit
            });
            resp.total_records = await this.prisma.organization.count({});
            resp.data = OrganizationMapper.GET_A_SINGLE_LIST_ORGANIZATIONS(data)
        } catch (error) {
            this.LOGGER.error(`|DB-EXCEPTION|[🐛🚨][updateOrganization] ${error} [💥]`);
        }
        return resp;
    }

    public async removeOrganization(organization_id: number): Promise<number> {
        this.LOGGER.info(`[🔖💬][DAO][removeOrganization] - organization_id: ${organization_id}`);
        try {
            let upd_org = await this.prisma.organization.update({
                where: {
                    id_organization: organization_id
                },
                data: {deleted: true}
            });
            this.LOGGER.info(`[🔖💬][DAO][removeOrganization] - data: ${upd_org}`);
            return 1;
        } catch (error) {
            this.LOGGER.error(`|DB-EXCEPTION|[🐛🚨][removeOrganization] ${error} [💥]`);
            return -1;
        }
    }
}