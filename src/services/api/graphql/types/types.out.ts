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
        t.nullable.int('id_organization'),
        t.nullable.string('name'),
        t.nullable.int('status')
    },
});

export const MetricsByTribeResponse = objectType({
    name: 'MetricsByTribeResponse',
    description: 'Structure for data response to metrics by tribe',
    definition(t) {
        t.nullable.id('id'),
        t.nullable.string('name'),
        t.nullable.string('organization'),
        t.nullable.string('coverage'),
        t.nullable.string('codeSmells'),
        t.nullable.string('bugs'),
        t.nullable.string('vulnerabilities'),
        t.nullable.string('hotspots'),
        t.nullable.string('verificationState'),
        t.nullable.string('state')
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

export const MetricsByTribeListResponse = objectType({
    name: 'MetricsByTribeListResponse',
    description: 'The metrics from a repository by tribe id list service response structure',
    definition(t) {
        t.field('responseCode', {
            type: 'ResponseCode',
            description: 'ResponseCode'
        });
        t.list.nullable.field('data', {
            type: 'MetricsByTribeResponse'
        });
        t.nullable.int('total_records')
    },
});

export const CsvMetricsByTribeListResponse = objectType({
    name: 'CsvMetricsByTribeListResponse',
    description: 'The csv of metrics from a repository by tribe id list service response structure',
    definition(t) {
        t.field('responseCode', {
            type: 'ResponseCode',
            description: 'ResponseCode'
        });
        t.nullable.string('data')
    },
});

// #endregion [RESPONSES]
