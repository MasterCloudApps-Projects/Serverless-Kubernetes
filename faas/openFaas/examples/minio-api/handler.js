'use strict';

var Minio = require('minio');
const { Path } = require('path-parser');
const fs = require('fs');


var minioClient = new Minio.Client({
  endPoint: process.env["endpoint"],
  port: Number.parseInt(process.env["minio-port"]),
  useSSL: (process.env["use-ssl"] == 'true'),
  accessKey: fs.readFileSync("/var/openfaas/secrets/acceskey", "utf-8"),
  secretKey: fs.readFileSync("/var/openfaas/secrets/secretkey", "utf-8")
});

module.exports = async (event, context) => {
  context.headerValues['content-type'] = 'application/json';
  const rootPath = new Path('/');
  const pathBucket = new Path('/:bucketName');
  const pathObject = new Path('/:bucketName/:objectName');
  if (rootPath.test(event.path)) {
    var buckets = await minioClient.listBuckets();
    return context.status(200).succeed(buckets);
  } else if (pathBucket.test(event.path)) {
    const params = pathBucket.test(event.path);
    switch (event.method) {
      case 'GET':
        var stream = minioClient.listObjects(params.bucketName, '', false);
        return streamToPromise(stream, context);
        break;
      case 'POST':
        const file = event.files.file;
        return new Promise((resolve, reject) => {
          const metadata = {
            'Content-Type': file.mimetype,
          };

          minioClient.putObject(
            params.bucketName,
            file.name,
            file.data,
            file.size,
            metadata,
            function (err, etag) {
              if (err) reject(err);
              resolve(context.status(200).succeed(file));
            }
          );
        });

        break;
      default:
        return context.status(400).fail({ error: 'Method not allowed' });
    }
  } else if (pathObject.test(event.path)) {
    const params = pathObject.test(event.path);
    switch (event.method) {
      case 'GET':
        const url = await minioClient.presignedUrl('GET', params.bucketName, params.objectName, 24*60*60, {host:'localhost:55986'});
        context.headerValues['Location'] = url;
        context.status(302).succeed({redirect: url}); 
        break;
      case 'DELETE':
        await minioClient.removeObject(params.bucketName, params.objectName);
        context.status(200).succeed({ delete: true });
        break;

      default:
        return context.status(400).fail({ error: 'Method not allowed' });
    }
  } else {
    return context.status(404).succeed({ error: 'NOT FOUND' });
  }
};

function streamToPromise(stream, context) {
  const objects = [];
  return new Promise((resolve, reject) => {
    stream.on('data', function (obj) {
      console.log('ON data :' + obj);
      objects.push(obj);
    });
    stream.on('error', function (err) {
      console.log(err);
    });
    stream.on('end', function () {
      console.log('end');
      resolve(context.status(200).succeed(objects));
    });
    stream.on('close', function () {
      console.log('close');
    });
  });
}
