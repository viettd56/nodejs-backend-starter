import directiveResolvers from './directiveResolvers';
import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

import { IResolvers } from 'graphql-tools';
import { ICradle } from 'src/container';
const query = readFileSync(path.join(__dirname, 'Query.graphql'), 'UTF-8');
const mutation = readFileSync(path.join(__dirname, 'Mutation.graphql'), 'UTF-8');

export const ServerGraphQLMobileSchema = ({ mobileNoteResolvers }: Pick<ICradle, 'mobileNoteResolvers'>) => {
    const { resolvers: noteResolver, typeDef: note } = mobileNoteResolvers;
    // const { resolvers, typeDef } = mobileNoteResolvers;
    // const resolvers = _.merge({}, noteResolver) as IResolvers;
    const resolvers = _.merge({}, noteResolver) as IResolvers;

    const typeDefs = [query, mutation, note];
    return { typeDefs, resolvers, directiveResolvers };
};
