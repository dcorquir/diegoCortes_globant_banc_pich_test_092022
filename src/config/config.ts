require('dotenv').config();

const cfg = {
    microservice: {
        api: {
            url: process.env.URL_API || 'http://localhost',
            port: process.env.PORT_API || 3000,
            context: process.env.CONTEXT_API || 'api'
        }
    },
    logger: {
        logger_root_files_directory: process.env.ENV_LOGGER_DIRECTORY,
        logger_root_level: process.env.ENV_LOGGER_LEVEL || 'info',
        logger_file_name: `${process.env.LOG_FILE_NAME || ''}_api.log`,
    },
    jwt: {
        key: process.env.JWT_KEY || 'gmKctPp6.r2sB(AOz-(+Rb5B8@ZxD&yG!bmEC#CW0t}zb9mEsS',
        expTime: 900000,
        algorithm: 'HS512',
        enable: process.env.JWT_ENABLE
    }
};

export default cfg;
