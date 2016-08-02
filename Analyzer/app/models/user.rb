class User < ActiveRecord::Base
	has_many :charts

	def getOrCreateChart(url, tv_id, image_url, title, exchange, pair, direction, timestamp, interval)
		chart = self.charts.where(tv_id: tv_id)

		if chart.present?
			return chart
		else
			return charts.create(	url: url,
									tv_id: tv_id,
									image_url: image_url,
									title: title,
									exchange: exchange,
									pair: pair,
									direction: direction,
									timestamp: timestamp,
									interval: interval
								)
		end

	end
end
