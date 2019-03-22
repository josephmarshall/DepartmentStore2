class Product < ApplicationRecord
  belongs_to :department
  validates :name, presence: true
end
