import { inputObjectType } from 'nexus';

export const OrganizationDataIn = inputObjectType({
    name: 'OrganizationDataIn',
    definition(t) {
        t.nullable.string('name'),
        t.nullable.int('status')
    }
});