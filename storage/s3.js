var keystone = require('keystone');

var storage = new keystone.Storage({
  adapter: require('keystone-storage-adapter-s3'),
  s3: {
    key: process.env.S3_KEY,
    secret: process.env.S3_SECRET,
    bucket: process.env.S3_BUCKET,
    region: process.env.S3_REGION,
    publicUrl: process.env.CLOUDFRONT_URI, // optional; sets a custom domain for public urls - see below for details
    uploadParams: { // optional; add S3 upload params; see below for details
      ACL: 'public-read',
    },
  },
  schema: {
    bucket: true, // optional; store the bucket the file was uploaded to in your db
    etag: true, // optional; store the etag for the resource
    path: true, // optional; store the path of the file in your db
    url: true, // optional; generate & store a public URL
  },
});

module.exports = storage;