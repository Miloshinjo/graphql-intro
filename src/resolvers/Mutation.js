import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(parent, args, { db }, info) {
    const usernameTaken = db.users.some(user => {
      return user.username === args.data.username;
    });

    if (usernameTaken) {
      throw new Error('Username is taken');
    }

    const user = {
      id: uuidv4(),
      ...args.data
    };

    db.users.push(user);

    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex(user => {
      return user.id === args.id;
    });

    if (userIndex === -1) throw new Error('Users not found');

    const deletedUsers = db.users.splice(userIndex, 1);

    db.tweets = db.tweets.filter(tweet => {
      return tweet.author !== args.id;
    });

    return deletedUsers[0];
  },
  updateUser(parent, args, { db }, info) {
    const user = db.users.find(user => user.id === args.id);

    if (!user) throw new Error('User not found');

    if (typeof args.data.username === 'string') {
      const usernameTaken = db.users.some(user => user.username === args.data.username);

      if (usernameTaken) throw new Error('Email taken');

      user.username = args.data.username;
    }

    return user;
  },
  createTweet(parent, args, { db }, info) {
    const userExists = db.users.some(user => {
      return user.id === args.data.author;
    });

    if (!userExists) {
      throw new Error('User not found');
    }

    const tweet = {
      id: uuidv4(),
      ...args.data
    };

    db.tweets.push(tweet);

    return tweet;
  },
  deleteTweet(parent, args, { db }, info) {
    const tweetIndex = db.tweets.findIndex(tweet => {
      return tweet.id === args.id;
    });

    if (tweetIndex === -1) throw new Error('Tweets not found');

    const deletedTweets = db.tweets.splice(tweetIndex, 1);

    return deletedTweets[0];
  },
  updateTweet(parent, args, { db }, info) {
    const tweet = db.tweets.find(tweet => tweet.id === args.id);

    if (!tweet) throw new Error('Tweet not found');

    if (typeof args.data.body === 'string') {
      tweet.body = args.data.body;
    }

    return tweet;
  }
};

export { Mutation as default };
