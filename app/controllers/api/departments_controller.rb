class Api::DepartmentsController < ApplicationController
before_action :set_department, only: [:show, :update, :destroy]

  def index
    departments = Department.all
    render json: departments
  end

  def show
    render json: @department
  end

  def create
    department = Department.new(department_params)
    if department.save
      render json: department
    else
      render json; {message: "failed to save"}
    end
  end

  def update
    if @department.update(department_params)
      render json: @department
    else
      render json: {message: "failed to update"}
    end
  end

  def destroy
    @department.destroy
    render json: {message: "Department Deleted"}
  end

  private

  def set_department
    @department = Department.find(params[:id])
  end

  def department_params
    params.require(:department).permit(:name, :description)
  end

end
