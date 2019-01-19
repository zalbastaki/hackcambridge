var keystone = require('keystone');

var storage = new keystone.Storage({
	adapter: require('keystone-storage-adapter-azure'),
	azure: {
	  accountName: process.env.AZURE_STORAGE_ACCOUNT,
	  accountKey: process.env.AZURE_STORAGE_ACCESS_KEY,
	  container: process.env.AZURE_STORAGE_CONTAINER,
	  generateFilename: keystone.Storage.randomFilename,
	},
	schema: {
	  container: true, // optional; store the referenced container in the database
	  etag: true, // optional; store the etag for the resource
	  url: true, // optional; generate & store a public URL
	},
});

module.exports = storage;
