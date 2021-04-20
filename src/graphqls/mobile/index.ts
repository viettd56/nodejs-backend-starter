import directiveResolvers from './directiveResolvers';
import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

import { ICradle } from 'src/container';
const query = readFileSync(path.join(__dirname, 'Query.graphql'), 'UTF-8');
const mutation = readFileSync(path.join(__dirname, 'Mutation.graphql'), 'UTF-8');

export const ServerGraphQLMobileSchema = ({ mobileNoteSchema }: ICradle) => {
    const allSchema = {
        mobileNoteSchema,
    };
    let resolvers = {};
    const typeDefs = [query, mutation];
    _.forEach(allSchema, (schema) => {
        resolvers = _.merge(resolvers, schema.resolvers);
        typeDefs.push(schema.typeDef);
    });
    return { typeDefs, resolvers, directiveResolvers };
};
