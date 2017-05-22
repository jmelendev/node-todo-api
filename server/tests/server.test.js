const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

var todos = [
  {
    text: 'First Test Todo',
    _id: new ObjectID(),
    completed: false,
    completedAt: 333
  },
  {
    text: 'Second Test Todo',
    _id: new ObjectID()
  }];

var objId = new ObjectID();
var badId = '123';

//wipe database so that assumptions below are correct
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST/todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err) {
        return done(err)
      }

      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => {
        done(e);
      });

    });
  });

  it('should not create todo with bad data', () => {
    request(app)
    .post('todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));

    })
  });
});

describe('GET/Todos', () => {
  it('should return all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET/todos/:id', () => {
  it('sould return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);

  });

  it('should return 404 if todo not found', (done) => {
    request(app)
    .get(`/todos/${objId.toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for non-object id', (done) => {
    request(app)
    .get(`/todos/${badId}`)
    .expect(404)
    .end(done);
  });


});

describe('DELETE/todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexId);
    })
    .end((err, res) => {
      if(err) {
        return done(err);
      }

      Todo.findById(hexId).then((todo) => {
        expect(todo).toNotExist();
        done();
      }).catch((e) => done(e));
    });
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
    .delete(`/todos/${objId.toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 if ObjectID is invalid', (done) => {
    request(app)
    .delete(`/todos/${badId}`)
    .expect(404)
    .end(done);
  });
});

describe('PATCH/todos/:id', () => {
  it('should update todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = 'patch test';
    var completed = true;

    request(app)
    .patch(`/todos/${hexId}`)
    .send({text, completed})
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(completed);
      expect(res.body.todo.completedAt).toBeA('number');
    })
    .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var hexId = todos[1]._id.toHexString();
    var text = 'patch test 2';
    var completed = false;
    var completedAt = null;

    request(app)
    .patch(`/todos/${hexId}`)
    .send({text, completed, completedAt})
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done);
  });
});
