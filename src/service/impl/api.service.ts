import "reflect-metadata";
import * as fs from 'fs';

import { inject, injectable } from 'inversify';
import { APPLICATION_TYPES } from "./../../config/inversify/ApplicationTypes";
import { Codes } from './../../utils/messages/Codes';
import { IApiService } from './../interfaces/Iapi.service';
import { LoggerCfg } from './../../config/Logger';
import { IApiDAO } from './../../dao/interfaces/IapiDAO';
import { IOrganizationCreate } from './../../services/api/dto/request/OrganizationDTO';
import { IResponseDTO } from './../../services/api/dto/responses/ResponseDTO';
import { ITribeResponseDetailsDTO } from './../../services/api/dto/responses/TribeResponsesDTO';
import { headerCsvMetricsByTribe } from './../../utils/enums/repository.enum';
import { FilesUtils } from './../../utils/files.utils';

@injectable()
export class AppServiceImpl implements IApiService {

    private readonly LOGGER = LoggerCfg.getLogger();
    private iAppDAO: IApiDAO;

    constructor(
        @inject(APPLICATION_TYPES.IApiDAO) appDAO: IApiDAO,
    ) {
        this.iAppDAO = appDAO;
    }


    public async createOrganization(organization: IOrganizationCreate): Promise<IResponseDTO> {
        this.LOGGER.info(`[🔖💬][SERVICE][createOrganization] - organization: ${JSON.stringify(organization)}`);

        let code;
        let data;

        if (!organization.name || organization.name === '') {
            code = Codes.V_BC_PCH_00001();
        } else if (!organization.status) {
            code = Codes.V_BC_PCH_00002();
        }

        try {
            if (!code) {
                let org_found = await this.iAppDAO.findOrganizationByName(organization.name);
                if (!org_found) {
                    data = await this.iAppDAO.createOrganization(organization);
                    this.LOGGER.info(`[🔖💬][createOrganization] - created_id: ${data}`);
                    code = Codes.BC_PCH_00000();
                } else {
                    code = Codes.V_BC_PCH_00003();
                }

            }
        } catch (error) {
            this.LOGGER.error(`[🔥🐛][createOrganization] - Exception: ${error} 🚧`);
            code = Codes.BC_PCH_00002();
            code.message = JSON.stringify(error);
        }

        return {
            responseCode: { ...code },
            data: data
        }
    }

    public async updateOrganization(organization_id: number, organization: IOrganizationCreate): Promise<IResponseDTO> {
        this.LOGGER.info(`[🔖💬][SERVICE][organization_id] - organization_id: ${organization_id} - organization: ${JSON.stringify(organization)}`);

        let code;
        let data;

        if (!organization_id) {
            code = Codes.V_BC_PCH_00004();
        } else if (!organization.name || organization.name === '') {
            code = Codes.V_BC_PCH_00001();
        } else if (!organization.status) {
            code = Codes.V_BC_PCH_00002();
        }

        try {
            if (!code) {
                data = await this.iAppDAO.updateOrganization(organization_id, organization);
                this.LOGGER.info(`[🔖💬][createOrganization] - created_id: ${data}`);
                code = Codes.BC_PCH_00000();
            }
        } catch (error) {
            this.LOGGER.error(`[🔥🐛][createOrganization] - Exception: ${error} 🚧`);
            code = Codes.BC_PCH_00002();
            code.message = JSON.stringify(error);
        }

        return {
            responseCode: { ...code },
            data: data
        }
    }

    public async getOrganizationsList(skip: number, limit: number): Promise<IResponseDTO> {
        this.LOGGER.info(`[🔖💬][SERVICE][getOrganizationsList] - skip: ${skip} - limit: ${limit}`);

        let code = Codes.BC_PCH_00000();
        let total_records: number = 0;
        let data: IOrganizationCreate[] = [];

        try {
            let found = await this.iAppDAO.getOrganizationsList(skip, limit);
            total_records = found.total_records;
            data = found.data;
            this.LOGGER.info(`[🔖💬][getOrganizationsList] - data: ${data} - total_records: ${total_records}`);
        } catch (error) {
            this.LOGGER.error(`[🔥🐛][getOrganizationsList] - Exception: ${error} 🚧`);
            code = Codes.BC_PCH_00002();
            code.message = JSON.stringify(error);
        }

        return {
            responseCode: { ...code },
            total_records: total_records,
            data: data
        }
    }

    public async removeOrganization(organization_id: number): Promise<IResponseDTO> {
        this.LOGGER.info(`[🔖💬][SERVICE][removeOrganization] - organization_id: ${organization_id}`);

        let code = Codes.BC_PCH_00000();

        try {
            let removed = await this.iAppDAO.removeOrganization(organization_id);
            code = removed != -1 ? code : Codes.BC_PCH_00002();
            this.LOGGER.info(`[🔖💬][removeOrganization] - removed: ${removed}`);
        } catch (error) {
            this.LOGGER.error(`[🔥🐛][removeOrganization] - Exception: ${error} 🚧`);
            code = Codes.BC_PCH_00002();
            code.message = JSON.stringify(error);
        }

        return {
            responseCode: { ...code }
        }
    }

    public async getMetricsByTribeId(tribe_id: number): Promise<IResponseDTO> {
        this.LOGGER.info(`[🔖💬][SERVICE][getMetricsByTribeId] - tribe_id: ${tribe_id}`);

        let code = Codes.BC_PCH_00000();
        let data: ITribeResponseDetailsDTO[] = [];
        try {
            let tribe_found = await this.iAppDAO.getTribeId(tribe_id);
            if (tribe_found != -1) {
                data = await this.iAppDAO.getMetricsByTribeId(tribe_id);
                code = data.length > 0 ? code : Codes.V_BC_PCH_00006();
                this.LOGGER.info(`[🔖💬][getMetricsByTribeId] - data: ${data}`);
            } else {
                code = Codes.V_BC_PCH_00005();
            }
        } catch (error) {
            this.LOGGER.error(`[🔥🐛][getMetricsByTribeId] - Exception: ${error} 🚧`);
            code = Codes.BC_PCH_00002();
            code.message = JSON.stringify(error);
        }

        return {
            responseCode: { ...code },
            data: data
        }

    }


    public async getCsvMetricsByTribeId(tribe_id: number): Promise<IResponseDTO> {
        this.LOGGER.info(`[🔖💬][SERVICE][getMetricsByTribeId] - tribe_id: ${tribe_id}`);

        let code = Codes.BC_PCH_00000();
        let ret: string = '';
        try {

            let data: string = headerCsvMetricsByTribe.HEADER;
            let found = await this.iAppDAO.getMetricsByTribeId(tribe_id);

            data += FilesUtils.generateDataCsvMetricsByTribe(found);
            let file = await fs.promises.writeFile(headerCsvMetricsByTribe.FILE_NAME, data, "utf-8");
            ret = 'data:application/octet-stream;base64,' + FilesUtils.base64Encode(`${headerCsvMetricsByTribe.FILE_PATH}${headerCsvMetricsByTribe.FILE_NAME}`);

            this.LOGGER.info(`[🔖💬][getMetricsByTribeId] - data: ${data}`);
        } catch (error) {
            this.LOGGER.error(`[🔥🐛][getMetricsByTribeId] - Exception: ${error} 🚧`);
            code = Codes.BC_PCH_00002();
            code.message = JSON.stringify(error);
        }

        return {
            responseCode: { ...code },
            data: ret
        }

    }
}