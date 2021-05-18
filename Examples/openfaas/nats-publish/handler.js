'use strict'

const uri = 'nats://nats.openfaas:4222';

const NATS = require('nats');
const nc = NATS.connect({servers:[uri]});

module.exports = async (event, context) => {
  const result = {
    'status': 'Received input: ' + JSON.stringify(event.body)
  }

  try {
    nc.publish('nats-test', 'Hello World!')
  } catch (error) {
    console.error(error);
    throw error;
  }

  return context
    .status(200)
    .succeed(result)
}

