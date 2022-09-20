import { extendType, arg, intArg } from "nexus";
import { APPLICATION_TYPES } from './../../../config/inversify/ApplicationTypes';
import { AppContainer } from './../../../config/inversify/InversifyConfig';
import { IResponseDTO } from './../dto/responses/ResponseDTO';
import { IApiService } from './../../../service/interfaces/Iapi.service';
import { SingleResponse } from './../graphql/types/types.out';
import { OrganizationDataIn } from './../graphql/types/types.in';
import { AuthUtils } from './../../../utils/auth.utils';

/**
 * @description 📝 This mutation is to call the service to create a new organization in db
 * @author 👷 Diego Cortés <@dcorquir>
 */
 export const createOrganization = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createOrganization", {
            type: SingleResponse,
            description: '🔖 Create a new organization in db',
            args: {
                organization: arg({type: OrganizationDataIn})
            },
            async resolve(parent, args, context, info) {
                let code = await AuthUtils.validateAuthorization(context.user_session);
                if (!code) {
                    let apiService = AppContainer.get<IApiService>(APPLICATION_TYPES.IApiService);
                    let resp: IResponseDTO = await apiService.createOrganization(args.organization);
                    return resp;
                }
                return {
                    responseCode: {...code}
                }
            },
        });
    },
});

/**
 * @description 📝 This mutation is to call the service to update a organization in db
 * @author 👷 Diego Cortés <@dcorquir>
 */
 export const updateOrganization = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("updateOrganization", {
            type: SingleResponse,
            description: '🔖 Update the organization in db',
            args: {
                organization_id: intArg({ description: 'Unique organization id' }),
                organization: arg({type: OrganizationDataIn})
            },
            async resolve(parent, args, context, info) {
                let code = await AuthUtils.validateAuthorization(context.user_session);
                if (!code) {
                    let apiService = AppContainer.get<IApiService>(APPLICATION_TYPES.IApiService);
                    let resp: IResponseDTO = await apiService.updateOrganization(args.organization_id, args.organization);
                    return resp;
                }
                return {
                    responseCode: {...code}
                }
            },
        });
    },
});

/**
 * @description 📝 This mutation is to call the service to remove a organization in db
 * @author 👷 Diego Cortés <@dcorquir>
 */
 export const removeOrganization = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("removeOrganization", {
            type: SingleResponse,
            description: '🔖 Update the organization in db',
            args: {
                organization_id: intArg({ description: 'Unique organization id' })
            },
            async resolve(parent, args, context, info) {
                let code = await AuthUtils.validateAuthorization(context.user_session);
                if (!code) {
                    let apiService = AppContainer.get<IApiService>(APPLICATION_TYPES.IApiService);
                    let resp: IResponseDTO = await apiService.removeOrganization(args.organization_id);
                    return resp;
                }
                return {
                    responseCode: {...code}
                }
            },
        });
    },
});