import { IResponseDTO } from './../../services/api/dto/responses/ResponseDTO';
import { IOrganizationCreate } from './../../services/api/dto/request/OrganizationDTO';

export interface IApiService {

    createOrganization(organization: IOrganizationCreate): Promise<IResponseDTO>;
    updateOrganization(organization_id: number, organization: IOrganizationCreate): Promise<IResponseDTO>;
    getOrganizationsList(skip: number, limit: number): Promise<IResponseDTO>;
    removeOrganization(organization_id: number): Promise<IResponseDTO>;

}