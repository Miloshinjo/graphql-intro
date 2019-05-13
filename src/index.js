import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
  type Query {
    name: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    name() {
      return 'Mitch Buchannon';
    }
  }
};

// Server
const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => {
  console.log('GraphQL server has started!');
});
