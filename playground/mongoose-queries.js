const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

// var id = '591d0a3aec981311acc26c4a22';
//
// if (!ObjectID.isValid(id)) {
//   console.log('Id not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => {
//   console.log(e);
// });

var userId = '591a70868cbae6bb8480329e';

if (!ObjectID.isValid(userId)) {
  return console.log('Id not valid');
}

User.find({
  _id: userId
}).then((users) => {
  console.log(JSON.stringify(users, undefined, 2));
});

User.findOne({
  _id: userId
}).then((user) => {
  console.log(JSON.stringify(user, undefined, 2));
});

User.findById(userId).then((user) => {
  if (!user) {
    console.log('Unable to find user');
  }
  console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => {

  if (!ObjectID.isValid(userId)) {
    console.log('Id not valid', e);
  }

})
