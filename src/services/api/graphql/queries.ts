import { extendType, intArg, nonNull, stringArg, booleanArg, idArg } from "nexus";
import { Codes } from './../../../utils/messages/Codes';
import { AuthUtils } from './../../../utils/auth.utils';
import {
    SingleResponse,
    RepositoriesMockServiceResponse
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
                        repositories: [
                            {
                                "id": 1,
                                "state": 604
                            },
                            {
                                "id": 2,
                                "state": 605
                            },
                            {
                                "id": 3,
                                "state": 606
                            }
                        ]
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