module.exports = {

	insertCharts: function(arrayOfCharts) {
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://root:password@ds042379.mlab.com:42379/tv';

		MongoClient.connect(url, function(err, db) {
			
			// Get the documents collection 
			var collection = db.collection('charts');
			// Insert some documents 
			collection.insertMany(arrayOfCharts, function(err, result) {
				// callback(result);
				db.close();
			});

		});
	}
}