import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Tweet from './resolvers/Tweet';

const resolvers = {};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: { Query, Mutation, User, Tweet },
  context: { db }
});

server.start(() => {
  console.log('GraphQL server has started!');
});
