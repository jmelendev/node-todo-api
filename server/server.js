const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');

//models
var {Todo} = require('./models/todo');
var {user} = require('./models/user');

//create express instance
var app = express();

//set middlewar
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  // var todo = new Todo({
  //   text: req.body.text
  // });
  //
  // todo.save().then((doc) => {
  //   res.send(doc);
  // }, (e) => {
  //   res.status(400).send(e);
  // });

  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

});

//listen for express app
app.listen(3000, () => {
  console.log('Started server on port 3000');
});
