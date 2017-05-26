const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  {
    '_id': userOneId,
    'email': 'jordan@example.com',
    'password': 'testing123',
    'tokens': [{
      'access': 'auth',
      'token': jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_secret).toString()
    }]
  }, {
    '_id': userTwoId,
    'email': 'chel@example.com',
    'password': 'password2',
    'tokens': [{
      'access': 'auth',
      'token': jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_secret).toString()
    }]
  }
];

const todos = [
  {
    text: 'First Test Todo',
    _id: new ObjectID(),
    completed: false,
    completedAt: 333,
    _creator: userOneId
  },
  {
    text: 'Second Test Todo',
    _id: new ObjectID(),
    _creator: userTwoId
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
}
