import _ from 'lodash';
const createSchema = (
    listTypeDef: Array<{
        resolvers: {};
        typeDef: string;
    }>,
    {
        query,
        mutation,
    }: {
        query: string;
        mutation: string;
    },
) => {
    let resolvers = {};
    const typeDefs = [query, mutation];

    listTypeDef.forEach((element) => {
        resolvers = _.merge(resolvers, element.resolvers);
        typeDefs.push(element.typeDef);
    });

    return {
        resolvers,
        typeDefs,
    };
};

export const GraphQLHelper = {
    createSchema,
};
