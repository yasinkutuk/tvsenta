class UpdatesController < ApplicationController


require 'mongo'


	def update
		client = Mongo::Client.new('mongodb://root:password@ds042379.mlab.com:42379/tv')
		collection = client[:charts]

		counter = 0
		collection.find.each do |document|
			counter += 1
  			user = getOrCreateUser(document[:user][:name], document[:user][:url])
			user.getOrCreateChart(	document[:url],
									document[:id],
									document[:image_url],
									document[:title],
									document[:exchange],
									document[:pair],
									document[:direction],
									document[:timestamp],
									document[:interval]
								)
		end

		@stuff = counter

	end




	private

	def getOrCreateUser(name, url)
		user = User.where(name: name)

		if user.present?
			return user.first
		else
			User.create(name: name, url: url)
		end
	end





end
