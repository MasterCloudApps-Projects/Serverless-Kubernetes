'use strict'
const jwt = require('jsonwebtoken');

module.exports = async (event, context) => {
  console.log(`headers ${JSON.stringify(event.headers)}`);
  const result = {
    'status': 'Received input: ' + JSON.stringify(event.body),
    'user': event.headers['x-forwarded-user'],
    'jwt': event.headers['x-forwarded-access-token'],
    'v':1
  }

  return context
    .status(200)
    .succeed(result)
}

