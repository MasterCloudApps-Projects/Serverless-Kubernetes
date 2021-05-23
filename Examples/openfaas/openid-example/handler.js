'use strict'
const jwt = require('jsonwebtoken');

module.exports = async (event, context) => {
  console.log(`headers ${JSON.stringify(event.headers)}`);
  const token = event.headers['x-forwarded-access-token'];
  const result = {
    'status': 'Received input: ' + JSON.stringify(event.body),
    'user': event.headers['x-forwarded-user'],
    'jwt': event.headers['x-forwarded-access-token'],
    'v':1
  }


  var decoded = jwt.decode(token);
  console.log(decoded);
  jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, payload) {
    console.error(err);
    console.log(payload);
  });

  return context
    .status(200)
    .succeed(result)
}

