class Api::CartsController < ApplicationController
  
  def index
    render json: Cart.all
  end

  def create
    cart = Cart.new(cart_params)
    if cart.save
      render json: cart
    else
      render json: cart.errors, status: 422
    end
  end

  def destroy
    @cart.destroy
    render json: {message: "cart deleted"}
  end

  private

  def cart_params
    params.rquire(:cart).permit(:type)
  end
  
end
