Snakejs::Application.routes.draw do
  resources :high_scores, :only => [:create, :index]
  root to: "static_pages#root"
end
