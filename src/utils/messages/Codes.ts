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
            description: 'Se ha procesoado correctamente.',
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
            message: 'Ha ocurrido una excepcion interna. Por favor intentalo de nuevo.',
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
            message: 'No se puede acceder.',
            level: 'UNAUTHORIZED',
            description: 'No tienes permisos para acceder la módulo.'
        }
    },

    // #endregion [GENERAL_RESPONSES]

    // #region [BUSSINESS_VALIDATIONS]

    /**
     * @description: This code is to describe when the name field is empty.
     * @author: Diego Cortés <@DCORQUIR>
     * @returns V_BC_PCH_00001
     */
     V_BC_PCH_00001: (): Code => {
        return {
            code: 'V_BC_PCH_00001',
            message: 'El nombre de la organizacion es requerido.',
            level: 'WARN',
            description: 'El nombre de la organizacion no puede estar vacio.'
        }
    },
    /**
     * @description: This code is to describe when the status field is empty.
     * @author: Diego Cortés <@DCORQUIR>
     * @returns V_BC_PCH_00002
     */
     V_BC_PCH_00002: (): Code => {
        return {
            code: 'V_BC_PCH_00002',
            message: 'El estado de la organizacion es requerido.',
            level: 'WARN',
            description: 'El estado de la organizacion no puede estar vacio.'
        }
    },
    /**
     * @description: This code is to describe when already exists a organization with the name in db.
     * @author: Diego Cortés <@DCORQUIR>
     * @returns V_BC_PCH_00003
     */
     V_BC_PCH_00003: (): Code => {
        return {
            code: 'V_BC_PCH_00003',
            message: 'Ya existe una organizacon con ese nombre.',
            level: 'WARN',
            description: 'Ya existe una organizacon con ese nombre, registrada en la bd.'
        }
    },
    /**
     * @description: This code is to describe when the is organization is empty.
     * @author: Diego Cortés <@DCORQUIR>
     * @returns V_BC_PCH_00004
     */
     V_BC_PCH_00004: (): Code => {
        return {
            code: 'V_BC_PCH_00004',
            message: 'El id de la organizacion es requerido.',
            level: 'WARN',
            description: 'El id de la organizacion no puede estar vacio.'
        }
    },
    /**
     * @description: This code is to describe when the tribe do not exists in db.
     * @author: Diego Cortés <@DCORQUIR>
     * @returns V_BC_PCH_00005
     */
     V_BC_PCH_00005: (): Code => {
        return {
            code: 'V_BC_PCH_00005',
            message: 'La Tribu no se encuentra registrada.',
            level: 'WARN',
            description: 'No se reconoce la informacino de la tribu en la bd.'
        }
    },
    /**
     * @description: This code is to describe when the tribe do not have repositories with 75% of coverage.
     * @author: Diego Cortés <@DCORQUIR>
     * @returns V_BC_PCH_00006
     */
     V_BC_PCH_00006: (): Code => {
        return {
            code: 'V_BC_PCH_00006',
            message: 'La Tribu no tiene repositorios que cumplan con la cobertura necesaria.',
            level: 'WARN',
            description: 'La Tribu no tiene repositorios que cumplan con la cobertura necesaria.'
        }
    },

    // #endregion [BUSSINESS_VALIDATIONS]


};

export interface Code {
    code: string,
    message: string,
    level: string,
    description: string,
    validations?: Code[]
}