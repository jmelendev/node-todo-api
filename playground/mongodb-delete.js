// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    //use return to end function if err
    return console.log('We were unable to connect to mongodb server');
  }

  console.log('Connected To mongodb server');

  //delete many
  // db.collection('Todos').deleteMany({text: 'shower'}).then((res) => {
  //   console.log(res);
  // });

  //delete one
  // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((res) => {
  //   console.log(res);
  // });

  //findOne and delete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
  //   console.log(res);
  // });

  //CHALLENGE

  //delete many Users
  db.collection('Users').deleteMany({name: 'Jordan'}).then((res) => {
    console.log(res);
  });

  //findOneAndDelete
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5916875b37483966a99346df')
  }).then((res) => {
    console.log(res);
  });

  // db.close();
});
