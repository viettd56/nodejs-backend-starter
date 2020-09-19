import { defaultFieldResolver, GraphQLField } from 'graphql';

import { SchemaDirectiveVisitor } from 'graphql-tools';
import { IMobileContext } from 'src/types';

class Log extends SchemaDirectiveVisitor {
    public visitFieldDefinition(fields: GraphQLField<any, any>) {
        const { resolve = defaultFieldResolver } = fields;
        fields.resolve = async (root, args, context: IMobileContext, info) => {
            console.log('args', args);
            console.log('context', context);
            return resolve.apply(this, [root, args, context, info]);
        };
    }
}

export default Log;
