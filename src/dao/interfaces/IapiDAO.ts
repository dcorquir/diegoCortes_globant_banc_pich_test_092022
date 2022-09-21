import { IOrganizationCreate, IOrganization } from './../../services/api/dto/request/OrganizationDTO';
import { IBasicListResponseDTO } from './../../services/api/dto/responses/ResponseDTO';
import { ITribeResponseDetailsDTO } from './../../services/api/dto/responses/TribeResponsesDTO';

export interface IApiDAO {

    findOrganizationByName(name: string): Promise<IOrganization>;
    createOrganization(organization: IOrganizationCreate): Promise<number>;
    updateOrganization(organization_id: number, organization: IOrganizationCreate): Promise<number>;
    getOrganizationsList(skip: number, limit: number): Promise<IBasicListResponseDTO>;
    removeOrganization(organization_id: number): Promise<number>;
    getTribeId(tribe_id: number): Promise<number>;
    getMetricsByTribeId(tribe_id: number): Promise<ITribeResponseDetailsDTO[]>;

}