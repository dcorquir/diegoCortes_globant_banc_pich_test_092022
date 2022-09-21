import { extendType, intArg } from "nexus";
import { Codes } from './../../../utils/messages/Codes';
import { AuthUtils } from './../../../utils/auth.utils';
import { CommonUtils } from './../../../utils/common.utils';
import { AppContainer } from './../../../config/inversify/InversifyConfig';
import { APPLICATION_TYPES } from './../../../config/inversify/ApplicationTypes';
import { IApiService } from './../../../service/interfaces/Iapi.service';
import { IResponseDTO } from './../dto/responses/ResponseDTO';
import {
    SingleResponse,
    RepositoriesMockServiceResponse,
    OrganizationListResponse,
    MetricsByTribeListResponse,
    CsvMetricsByTribeListResponse
} from './types/types.out';

/**
 * @description 📝 This query is to call the service to verify available service.
 * @author 👷 Diego Cortés <@dcorquir>
 */
export const healthCheck = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field("healthCheck", {
            type: SingleResponse,
            description: '🔖 Heat Check, to verify available service',
            args: {},
            async resolve(parent, args, context, info) {
                return {
                    responseCode: { ...Codes.BC_PCH_00000() }
                };
            },
        });
    },
});

/**
 * @description 📝 This query is to call the service to get repositories mock
 * @author 👷 Diego Cortés <@dcorquir>
 */
export const getRepositoriesMock = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field("getRepositoriesMock", {
            type: RepositoriesMockServiceResponse,
            description: '🔖 Get Repositories Mock, get mock data of repositories',
            args: {},
            async resolve(parent, args, context, info) {
                let code = AuthUtils.validateAuthorization(context.user_session);
                if (!code) {
                    return {
                        responseCode: { ...Codes.BC_PCH_00000() },
                        repositories: CommonUtils.getRepositoriesMockData()
                    };
                } else {
                    return {
                        responseCode: { ...code },
                    }
                }
            },
        });
    },
});

/**
 * @description 📝 This query is to call the service to get repositories mock
 * @author 👷 Diego Cortés <@dcorquir>
 */
 export const getOrganizationsList = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field("getOrganizationsList", {
            type: OrganizationListResponse,
            description: '🔖 Get Repositories Mock, get mock data of repositories',
            args: {
                skip: intArg({ description: '📌 Skip page' }),
                limit: intArg({ description: '📌 Limit of list' }),
            },
            async resolve(parent, args, context, info) {
                let code = AuthUtils.validateAuthorization(context.user_session);
                if (!code) {
                    let apiService = AppContainer.get<IApiService>(APPLICATION_TYPES.IApiService);
                    let resp: IResponseDTO = await apiService.getOrganizationsList(args.skip, args.limit);
                    return resp;
                } else {
                    return {
                        responseCode: { ...code },
                    }
                }
            },
        });
    },
});

/**
 * @description 📝 This query is to call the service to get metrics by tribe id
 * @author 👷 Diego Cortés <@dcorquir>
 */
 export const getMetricsByTribeId = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field("getMetricsByTribeId", {
            type: MetricsByTribeListResponse,
            description: '🔖 Get Repositories Mock, get mock data of repositories',
            args: {
                tribe_id: intArg({ description: '📌 Skip page' }),
            },
            async resolve(parent, args, context, info) {
                let code = AuthUtils.validateAuthorization(context.user_session);
                if (!code) {
                    let apiService = AppContainer.get<IApiService>(APPLICATION_TYPES.IApiService);
                    let resp: IResponseDTO = await apiService.getMetricsByTribeId(args.tribe_id);
                    return resp;
                } else {
                    return {
                        responseCode: { ...code },
                    }
                }
            },
        });
    },
});

/**
 * @description 📝 This query is to call the service to get csv with metrics by tribe id
 * @author 👷 Diego Cortés <@dcorquir>
 */
 export const getCsvMetricsByTribeId = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field("getCsvMetricsByTribeId", {
            type: CsvMetricsByTribeListResponse,
            description: '🔖 Get Repositories Mock, get mock data of repositories',
            args: {
                tribe_id: intArg({ description: '📌 Skip page' }),
            },
            async resolve(parent, args, context, info) {
                let code = AuthUtils.validateAuthorization(context.user_session);
                if (!code) {
                    let apiService = AppContainer.get<IApiService>(APPLICATION_TYPES.IApiService);
                    let resp: IResponseDTO = await apiService.getCsvMetricsByTribeId(args.tribe_id);
                    return resp;
                } else {
                    return {
                        responseCode: { ...code },
                    }
                }
            },
        });
    },
});

