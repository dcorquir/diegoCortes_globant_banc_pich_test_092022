import { objectType } from 'nexus';

// #region [DATA]

export const DataRepositoriesMockServiceResponse = objectType({
    name: 'DataRepositoriesMockServiceResponse',
    description: 'Structure for data response to repositories mock service',
    definition(t) {
        t.nullable.id('id'),
        t.nullable.id('state')
    },
});

export const OrganizationResponse = objectType({
    name: 'OrganizationResponse',
    description: 'Structure for data response to organization',
    definition(t) {
        t.nullable.id('id_organization'),
        t.nullable.string('name'),
        t.nullable.int('status')
    },
});

// #endregion [DATA]

// #region [RESPONSES]
export const SingleResponse = objectType({
    name: 'SingleResponse',
    description: 'The single response structure',
    definition(t) {
        t.field('responseCode', {
            type: 'ResponseCode',
            description: 'ResponseCode'
        });
    },
});

export const RepositoriesMockServiceResponse = objectType({
    name: 'RepositoriesMockServiceResponse',
    description: 'The repositories mocks service response structure',
    definition(t) {
        t.field('responseCode', {
            type: 'ResponseCode',
            description: 'ResponseCode'
        });
        t.list.nullable.field('repositories', {
            type: 'DataRepositoriesMockServiceResponse'
        });
    },
});

export const OrganizationListResponse = objectType({
    name: 'OrganizationListResponse',
    description: 'The organization list service response structure',
    definition(t) {
        t.field('responseCode', {
            type: 'ResponseCode',
            description: 'ResponseCode'
        });
        t.list.nullable.field('data', {
            type: 'OrganizationResponse'
        });
        t.nullable.int('total_records')
    },
});

// #endregion [RESPONSES]
