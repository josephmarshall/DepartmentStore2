class Cart < ApplicationRecord
  has_many :cartItems, dependent: :destroy
end
