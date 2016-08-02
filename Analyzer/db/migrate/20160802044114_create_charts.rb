class CreateCharts < ActiveRecord::Migration
  def change
    create_table :charts do |t|
      t.references :user, index: true, foreign_key: true
      t.text :url
      t.string :tv_id
      t.text :image_url
      t.text :title
      t.text :exchange
      t.text :pair
      t.string :direction
      t.integer :timestamp
      t.string :interval

      t.timestamps null: false
    end
  end
end
