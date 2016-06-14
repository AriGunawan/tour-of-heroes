class CreateHeros < ActiveRecord::Migration
  def change
    create_table :heros do |t|
      t.string :name, null: false
      t.string :alter_ego
      t.references :power, null: false

      t.timestamps null: false
    end
  end
end
