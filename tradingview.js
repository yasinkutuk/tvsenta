var request = require('request');

const TV_HOST = 'https://www.tradingview.com'


module.exports = {


	getCharts: function (start, cb) {

		var options = {
			url: TV_HOST + '/chart/',
			headers: {
				Connection: 'close',
				Pragma: 'no-cache',
				'Cache-Control': 'no-cache',
				Accept: '*/*',
				'X-Language': 'en',
				'X-Requested-With': 'XMLHttpRequest',
				'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36',
				Referer: 'https://www.tradingview.com/chart/bitcoin/?sort=recent',
				'Accept-Encoding': 'identity',
				'Accept-Language': 'en-US,en;q=0.8',
			},
			qs: {
				// csrfmiddlewaretoken:'SiLhVmdx7rvoipkwHpto8o1g8XTLhgjx',
				stream:'bitcoin',
				interval:'all',
				sort:'recent',
				time:'day',
				by:'everyone',
				q:'',
				s: start,
				exclude_charts:''
			}
		};



		request(options, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				bodyObj = JSON.parse(body);
				

				cb({
					start: bodyObj.start,
					count: bodyObj.results.count,
					html: bodyObj.html

				});
			}
		});
	}
}