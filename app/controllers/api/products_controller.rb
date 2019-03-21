class Api::ProductsController < ApplicationController
before_action :set_department, only: [:index]
before_action :set_product, only: [:show, :update, :destroy]

  def index
    set_department
    render json: @department.products
  end
  
  def show
    render json: @product
  end

  def create
    product = Product.new(product_params)
    if product.save
      render json: product
    else
      render json: {message: "failed to save product"}
    end
  end

  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: {message: "failed to update product"}
    end
  end

  def destroy
    @product.destroy
    render json: {message: "product deleted"}
  end

  private

  def set_department
    @department = Department.find(params[:department_id])  
  end

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:name, :description, :price, :imageUrl, :department_id)
  end
end
