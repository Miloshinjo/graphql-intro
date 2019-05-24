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

const db = {
  users,
  tweets
};

export { db as default };
