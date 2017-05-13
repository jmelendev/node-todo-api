// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    //use return to end function if err
    return console.log('We were unable to connect to mongodb server');
  }

  console.log('Connected To mongodb server');

  //access collection
  // db.collection('Todos').find({
  //   _id: new ObjectID('5916ffc6bd460d384068f044')
  // }).toArray().then((docs)=> {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // });

  //toCount
  // db.collection('Todos').find().count().then((count)=> {
  //   console.log(`Todos count ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // });

  //query users db
  db.collection('Users').find({name: 'Chelsea'}).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch user', err);
  });
  // db.close();
});
