module.exports = {


	insertCharts: function(arrayOfCharts, callback) {
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://root:password@ds042379.mlab.com:42379/tv';
		var thisFile = this;

		MongoClient.connect(url, function(err, db) {
			console.log('connected');
			// Get the documents collection 
			var collection = db.collection('charts');


			collection.insertMany(arrayOfCharts, function(err, result) {
				db.close();
				console.log('closed');
				
				callback(result.nInserted);
			});

		});

	},

}