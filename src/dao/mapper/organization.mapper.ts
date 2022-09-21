import { IOrganization } from './../../services/api/dto/request/OrganizationDTO';

export const OrganizationMapper = {

    GET_A_SINGLE_ORGANIZATION: function (result: any): IOrganization {
        let org;
        if (result) {
            org = {
                id_organization: Number(result.id_organization),
                name: `${result.name}`,
                status: Number(result.status)
            };
        }
        return org as unknown as IOrganization;
    },
    GET_A_SINGLE_LIST_ORGANIZATIONS: function (result: any[]): IOrganization[] {
        let org: IOrganization[] = [];
        if (result) {
            result.forEach((itm) => {
                org.push(this.GET_A_SINGLE_ORGANIZATION(itm));
            });
        }
        return org;
    },

}