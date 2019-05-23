import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

// Mock user data defining 3 users
let users = [
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
let tweets = [
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

  type Mutation {
    createUser(data: CreateUserInput!): User!
    deleteUser(id: ID!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    createTweet(data: CreateTweetInput!): Tweet!
    deleteTweet(id: ID!): Tweet!
    updateTweet(id: ID!, data: UpdateTweetInput!): Tweet!
  }

  input CreateUserInput {
    username: String!
  }

  input UpdateUserInput {
    username: String
  }

  input CreateTweetInput {
    body: String!
    author: ID!
  }

  input UpdateTweetInput {
    body: String
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const usernameTaken = users.some(user => {
        return user.username === args.data.username;
      });

      if (usernameTaken) {
        throw new Error('Username is taken');
      }

      const user = {
        id: uuidv4(),
        ...args.data
      };

      users.push(user);

      return user;
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex(user => {
        return user.id === args.id;
      });

      if (userIndex === -1) throw new Error('Users not found');

      const deletedUsers = users.splice(userIndex, 1);

      tweets = tweets.filter(tweet => {
        return tweet.author !== args.id;
      });

      return deletedUsers[0];
    },
    updateUser(parent, args, ctx, info) {
      const user = users.find(user => user.id === args.id);

      if (!user) throw new Error('User not found');

      if (typeof args.data.username === 'string') {
        const usernameTaken = users.some(user => user.username === args.data.username);

        if (usernameTaken) throw new Error('Email taken');

        user.username = args.data.username;
      }

      return user;
    },
    createTweet(parent, args, ctx, info) {
      const userExists = users.some(user => {
        return user.id === args.data.author;
      });

      if (!userExists) {
        throw new Error('User not found');
      }

      const tweet = {
        id: uuidv4(),
        ...args.data
      };

      tweets.push(tweet);

      return tweet;
    },
    deleteTweet(parent, args, ctx, info) {
      const tweetIndex = tweets.findIndex(tweet => {
        return tweet.id === args.id;
      });

      if (tweetIndex === -1) throw new Error('Tweets not found');

      const deletedTweets = tweets.splice(tweetIndex, 1);

      return deletedTweets[0];
    },
    updateTweet(parent, args, ctx, info) {
      const tweet = tweets.find(tweet => tweet.id === args.id);

      if (!tweet) throw new Error('Tweet not found');

      if (typeof args.data.body === 'string') {
        tweet.body = args.data.body;
      }

      return tweet;
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
