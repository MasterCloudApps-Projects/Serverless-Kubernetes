'use strict'
const bent = require('bent');
const Minio = require('minio');
const fs = require('fs');

var minioClient = new Minio.Client({
  endPoint: process.env["endpoint"],
  port: Number.parseInt(process.env["minio-port"]),
  useSSL: (process.env["use-ssl"] == 'true'),
  accessKey: fs.readFileSync("/var/openfaas/secrets/acceskey", "utf-8"),
  secretKey: fs.readFileSync("/var/openfaas/secrets/secretkey", "utf-8")
});
const BUCKET_NAME = process.env["BUCKET_NAME"];


const AEMET_DOMAIN = 'http://www.aemet.es';
const AEMET_LOC_FOLDER = '/xml/municipios/localidad_';
const AEMET_FILE_EXT = '.xml';

module.exports = async (event, context) => {
  const getStream = bent(AEMET_DOMAIN)
  const aemetIDs = ['16130','33034','28079','10131'];
  // http://www.aemet.es/xml/municipios/localidad_16130.xml
  const promises = aemetIDs.map(async (aemetID) =>{
    const result = await downloadForecast(getStream, aemetID, context);
    return {[aemetID]:result};
  })
  const results = await Promise.all(promises);
  console.log(`Results ${results}`);
  return context.status(200).succeed(results); 
}

async function downloadForecast(getStream, aemetID, context) {
  let stream = await getStream(`${AEMET_LOC_FOLDER}${aemetID}${AEMET_FILE_EXT}`);
  var val = Math.floor(1000 + Math.random() * 9000);

  return new Promise((resolve, reject) => {
    const metadata = {
      'Content-Type': 'application/xml',
    };

    minioClient.putObject(
      BUCKET_NAME,
      `${aemetID}/${Date.now()}${AEMET_FILE_EXT}`,
      stream,
      stream.size,
      metadata,
      function (err, etag) {
        if (err)
          resolve(false);
        resolve(etag);
      }
    );
  });
}
