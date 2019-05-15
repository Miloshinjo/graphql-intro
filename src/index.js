import { GraphQLServer } from 'graphql-yoga';

// Mock user data defining 3 users
const users = [
  {
    id: '1',
    username: 'miloshinjo'
  },
  {
    id: '2',
    username: 'michaeljordan'
  },
  {
    id: '3',
    username: 'benderrodriguez'
  }
];

// Type definitions (schema)
const typeDefs = `
  type Query {
    me: User!
    users(query: String): [User!]!
  }

  type User {
    id: ID!
    username: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) return users;
      return users.filter(user => {
        return user.username.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    me() {
      return {
        id: '1',
        username: 'miloshinjo'
      };
    }
  }
};

// Server
const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => {
  console.log('GraphQL server has started!');
});
