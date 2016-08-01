var request = require('request');
var cheerio = require('cheerio');

const TV_HOST = 'https://www.tradingview.com'


module.exports = {


	getChartsData: function (start, cb) {

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


		console.log("hitting api");
		request(options, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				bodyObj = JSON.parse(body);
				

				cb({
					error: error,
					start: bodyObj.start,
					returned_count: bodyObj.results.count,
					total_found: bodyObj.results.total_found,
					html: bodyObj.html

				});
			} else {
				console.error(error);
				process.exit(1);
			}
		});
	},




	parseChartsHTML: function(html) {
		var $ = cheerio.load(html);
		var parsedCharts = []



		$('.stream-item-chart').each(function(i, elem) {
			currentChart = {}
			

			currentChart.user = {
				name: $(this).find('div.head a.avatar.userlink').data('username'),
				url: $(this).find('div.head a.avatar.userlink').attr('href')
			}

			currentChart.url = $(this).data('info').published_chart_url.replace(/\\\//g, "/");

			currentChart.id = $(this).data('uid');

			currentChart.image_url = $(this).find('img.chart-image').attr('src').replace('_mid', '');

			currentChart.title = $(this).find('img.chart-image').attr('title').replace('_mid', '');

			currentChart.exchange = $(this).find('.symbol a').attr('title').split(':')[0];

			currentChart.pair = $(this).find('img.chart-image').attr('alt');

			currentChart.direction = $(this).find('.chart-direction-label').text();

			currentChart.timestamp = parseInt($(this).find('.time-info').data('timestamp'));

			currentChart.interval = $(this).find('.interval').text().replace(', ', '');

			parsedCharts.push(currentChart);
		});

		return parsedCharts;

	}
}