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
// Mock tweets data
const tweets = [
  {
    id: '1000',
    body: 'GraphQL is awesome!',
    author: '3'
  },
  {
    id: '2000',
    body: 'GraphQL was made by Facebook in 2012.',
    author: '1'
  },
  {
    id: '3000',
    body: 'GraphQL stands for Graph Query Language',
    author: '1'
  }
];

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    tweets(query: String): [Tweet!]!
    me: User!
  }

  type User {
    id: ID!
    username: String!
    tweets: [Tweet!]!
  }

  type Tweet {
    id: ID!
    body: String!
    author: User!
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
    tweets(parent, args, ctx, info) {
      if (!args.query) return tweets;
      return tweets.filter(tweet => {
        return tweet.body.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    me() {
      return {
        id: '1',
        username: 'miloshinjo'
      };
    }
  },
  Tweet: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    }
  },
  User: {
    tweets(parent, args, ctx, info) {
      return tweets.filter(tweet => {
        return tweet.author === parent.id;
      });
    }
  }
};

// Server
const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => {
  console.log('GraphQL server has started!');
});
