class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.text :name
      t.text :url
      t.float :score

      t.timestamps null: false
    end
  end
end
