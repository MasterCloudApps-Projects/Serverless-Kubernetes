
var Minio = require('minio');
const fs = require('fs');

var minioClient = new Minio.Client({
  endPoint: process.env["endpoint"],
  port: Number.parseInt(process.env["minio-port"]),
  useSSL: (process.env["use-ssl"] == 'true'),
  accessKey: fs.readFileSync("/var/openfaas/secrets/acceskey", "utf-8"),
  secretKey: fs.readFileSync("/var/openfaas/secrets/secretkey", "utf-8")
});


function getObject(bucketName, file) {
  console.log(`getObject(${bucketName},${file})`);
  return minioClient.getObject(bucketName, decodeURIComponent(file) )
  .then((res)=>{
    return new Promise((resolve, reject) => {
      var body = "";
      res.on('readable', function() {
        const chunk  = res.read();
        body += chunk?chunk:'';
      });
      res.on('close', () => {
        resolve(body);
      });
    });
  })
}


module.exports =  {
    getObject
};