export enum repositoryStateStrEnum {
    E = 'Habililtado',
    D = 'Deshabilitado',
    A = 'Archivado',
}

export enum repositoryStateValEnum {
    ENABLE = 'E',
    DISABLE = 'D',
    ARCHIVED = 'A'
}

export enum repositoryVerificationCodeVal {
    VERIFY = 604,
    WAIT = 605,
    APPROVED = 606
}

export enum repositoryVerificationCodeStr {
    VERIFY = 'Verificado',
    WAIT = 'En espera',
    APPROVED = 'Aprobado'
}

export enum headerCsvMetricsByTribe {
    HEADER = 'id,name,tribe,organization,coverage,codeSmells,bugs,vulnerabilities,hotspots,verificationState,state\n',
    FILE_NAME = 'data.csv',
    FILE_PATH = './'
}