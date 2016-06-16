class AddPictureToHeroes < ActiveRecord::Migration
  def change
    add_column :heroes, :picture, :string
  end
end
