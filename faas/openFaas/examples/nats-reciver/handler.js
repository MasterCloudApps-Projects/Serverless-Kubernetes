'use strict'

module.exports = async (event, context) => {
  const result = {
    'status': 'Received input: ' + JSON.stringify(event)
  }
  console.log(result);

  return context
    .status(200)
    .succeed(result)
}

