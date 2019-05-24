const User = {
  tweets(parent, args, { db }, info) {
    return db.tweets.filter(tweet => {
      return tweet.author === parent.id;
    });
  }
};

export { User as default };
