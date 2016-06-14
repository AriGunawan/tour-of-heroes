class CreateHeroes < ActiveRecord::Migration
  def change
    create_table :heroes do |t|
      t.string :name
      t.string :alter_ego
      t.references :power, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
