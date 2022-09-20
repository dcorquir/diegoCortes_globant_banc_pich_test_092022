/* eslint-disable object-curly-newline */

export const Codes = {

    // #region [GENERAL_RESPONSES]

    /**
     * @description: This code is to describe a success operation.
     * @author: Diego Cortés <@DCORQUIR>
     * @returns BC_PCH_00000
     */
    BC_PCH_00000: (): Code => {
        return {
            code: 'BC_PCH_00000',
            message: 'OK',
            level: 'INFO',
            description: 'All is well!.',
        }
    },

    /**
     * @description: This code is to describe when an exception has been occurred.
     * @author: Diego Cortés <@DCORQUIR>
     * @returns BC_PCH_00002
     */
    BC_PCH_00002: (): Code => {
        return {
            code: 'BC_PCH_00002',
            message: 'An internal exception has been occurred. Please try again.',
            level: 'EXCEPTION',
            description: 'An internal exception has been occurred.'
        }
    },

    /**
     * @description: This code is to describe when Unauthorized.
     * @author: Diego Cortés <@DCORQUIR>
     * @returns BC_PCH_00003
     */
    BC_PCH_00003: (): Code => {
        return {
            code: 'BC_PCH_00003',
            message: 'Can not access.',
            level: 'UNAUTHORIZED',
            description: 'You do not have permissions to access.'
        }
    },

    // #endregion [GENERAL_RESPONSES]

};

export interface Code {
    code: string,
    message: string,
    level: string,
    description: string,
    validations?: Code[]
}