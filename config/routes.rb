Rails.application.routes.draw do

  namespace :api do
    resources :departments do
      resources :products
    end

    resources :carts do
      resources :cart_items
    end

  end  
  
end
