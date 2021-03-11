'use strict'

module.exports = async (event, context) => {
  console.log(`headers ${JSON.stringify(event.headers)}`);
  const result = {
    'status': 'Received input: ' + JSON.stringify(event.body)
  }

  return context
    .status(200)
    .succeed(result)
}

