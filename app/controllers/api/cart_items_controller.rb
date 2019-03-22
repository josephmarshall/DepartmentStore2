class Api::CartitemsController < ApplicationController
  before_action :set_cart, only: [:index]

  def index
    cartItems = @cart.items
    render json: cartItems
  end

  def create
    cartItem = CartItem.new(cartItem_params)
    if cartItem.save
      render json: cartItem
    else
      render json: cartItem.errors, status: 422
    end
  end

  def destroy
    CartItem.find(params[:id]).destroy
    render json: {message: "item deleted"}
  end

  private

  def set_cart
    @cart = Cart.find(params[:cart_id])
  end

  def cartItem_params
    params.require(:cartItem).permit(:name, :productNumber, :price, :cart_id)
  end

end
