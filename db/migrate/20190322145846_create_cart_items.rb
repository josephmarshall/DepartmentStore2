class CreateCartItems < ActiveRecord::Migration[5.2]
  def change
    create_table :cart_items do |t|
      t.string :name
      t.string :productNumber
      t.string :price
      t.belongs_to :cart, foreign_key: true

      t.timestamps
    end
  end
end
