const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) return db.users;
    return db.users.filter(user => {
      return user.username.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  tweets(parent, args, { db }, info) {
    if (!args.query) return db.tweets;
    return db.tweets.filter(tweet => {
      return tweet.body.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  me() {
    return {
      id: '1',
      username: 'miloshinjo'
    };
  }
};

export { Query as default };
