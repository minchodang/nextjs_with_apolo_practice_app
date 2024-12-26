import gql from 'graphql-tag';
import { menu } from 'src/data/menu';
import { profile } from 'src/data/profile';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import allowCors from '../utils/cors';

const typeDefs = gql`
    type Menu {
        id: String
        foodType: String
        name: String
        description: String
    }
    type Profile {
        id: String
        bio: String
    }
    type Query {
        menu: [Menu]
        profile: [Profile]
    }
`;

const resolvers = {
    Query: {
        menu: () => menu,
        profile: () => profile,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
    context: async (req, res) => ({ req, res }),
});

export default allowCors(handler);
