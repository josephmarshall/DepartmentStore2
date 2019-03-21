class CreateDepartments < ActiveRecord::Migration[5.2]
  def change
    create_table :departments do |t|
      t.string :name
      t.string :description
      t.string :imageUrl

      t.timestamps
    end
  end
end
