json.extract! chart, :id, :user_id, :exchange_id, :pair_id, :url, :tv_id, :image_url, :direction, :timestamp, :interval, :title, :created_at, :updated_at
json.url chart_url(chart, format: :json)