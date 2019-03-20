Rails.application.routes.draw do

  namespace :api do
    resources :departments do
      resources :products
    end
  end  
  
end
