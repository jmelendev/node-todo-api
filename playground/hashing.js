const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data, '123');
//
// console.log(token);
//
// var decoded = jwt.verify(token, '123');
//
// console.log('decoded', decoded);

// var message = 'I am user #3';
// var hash = SHA256(message).toString();
//
// console.log(`${message}`);
// console.log(`${hash}`);

// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//   console.log('Data was not changed, proceed with update');
// } else {
//   console.log('Data was altered, do not trust');
// }

// Using B Crypt
// ==================

var password = '123abc!';

//gen salt & hash
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var hashedPassword = '$2a$10$4ZRVI3k9Y3j1gYsBGo3m6.N5LTVguNp4NnInsTkp.EH6j.dzdWvhi';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
