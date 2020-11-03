'use strict'
const minio = require('./minio');
const aemet = require('./aemet');
const initDatabase = require("./mongo");

const EVENT_PUT = 's3:ObjectCreated:Put';

module.exports = async (event, context) => {
  let message = {};
  try {
    message = JSON.parse(event.body);
    
  } catch (error) {
    console.error(`Error parse body ${error}`)
    return context
    .status(301)
    .fail('Message not suported')
  }
  if(message.EventName !== EVENT_PUT){
    return context.status(405).fail(`event not allowed  ${message.EventName}`)
  }
  const record = message.Records[0];
  const forecastxML = await minio.getObject(record.s3.bucket.name, record.s3.object.key);
  const forecast = aemet.parseData(forecastxML);
  const repository = await initDatabase();
  return context.status(200).succeed(await repository.saveForecast(forecast));

  // const result = {
  //   'status': 'Received input: ' + JSON.stringify(message)
  // }

  // return context
  //   .status(200)
  //   .succeed(result)
}

