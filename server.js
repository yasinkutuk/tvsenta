var tradingview = require('./tradingview')


tradingview.getCharts(0, function(data) {
	console.log(data);
});