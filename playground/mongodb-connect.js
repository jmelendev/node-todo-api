// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    //use return to end function if err
    return console.log('We were unable to connect to mongodb server');
  }

  console.log('Connected To mongodb server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('There was an issue inserting todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Jordan',
  //   age: 24,
  //   location: 'Wethersfield'
  // }, (err, res) => {
  //   if (err) {
  //     return console.log('There was an error adding user to db', err);
  //   }
  //
  //   console.log(res.ops[0]._id.getTimestamp());
  // });

  db.close();
});
