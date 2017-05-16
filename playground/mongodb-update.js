// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    //use return to end function if err
    return console.log('We were unable to connect to mongodb server');
  }

  console.log('Connected To mongodb server');

  //findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({ //find
  //   _id: new ObjectID('591705ccbd460d384068f19b')
  // }, { //update
  //   $set: { //update operator
  //     completed: true
  //   }
  // }, { //options
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  //change name and update age
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('591689edb9613a66da453471')
  }, {
    $set: {name: 'Jordan'},
    $inc: {age: +1}
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res);
  })
  // db.close();
});
