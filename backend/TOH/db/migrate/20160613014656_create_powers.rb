class CreatePowers < ActiveRecord::Migration
  def change
    create_table :powers do |t|
      t.string :name, null: false

      t.timestamps null: false
    end
  end
end
