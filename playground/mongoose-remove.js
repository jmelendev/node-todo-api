const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

//Todo.remove
// Todo.remove({}).then((res) => {
//   console.log(res);
// });
// 
// Todo.findOneAndRemove({_id: '59206860a0441ad68e31baf5'}).then((doc) => {
//
// });


// Todo.findByIdAndRemove('59206860a0441ad68e31baf5').then((doc) => {
//   console.log(doc);
// });
