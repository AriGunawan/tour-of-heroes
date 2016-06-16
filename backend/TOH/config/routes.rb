Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :heroes, only: [:all, :show, :create, :update, :destroy, :last] do
        collection do
          get 'all'
          get 'last/:qty', to: 'heroes#last'
        end
      end
    end
  end
end
