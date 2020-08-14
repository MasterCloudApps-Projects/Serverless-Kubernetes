'use strict'

module.exports = async (event, context) => {

  console.log(event.body);
  console.log(JSON.stringify(event.body.Records.userIdentity));
  console.log(JSON.stringify(event.body.Records.requestParameters));
  console.log(JSON.stringify(event.body.Records.responseElements));
  console.log(JSON.stringify(event.body.Records.source));

  const result = {
    'status': 'Received input: ' + JSON.stringify(event.body)
  }

  return context
    .status(200)
    .succeed(result)
}

