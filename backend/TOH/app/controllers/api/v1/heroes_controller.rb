class Api::V1::HeroesController < ApplicationController
  respond_to :json

  def all
    @heroes = Hero.all
  end

  def show
    @hero = Hero.find(params[:id])
  end

  def create
    @hero = Hero.create(hero_params)
  end

  def update
    @hero = Hero.find(params[:id])
    @hero.update(hero_params)
  end

  def destroy
    hero = Hero.find(params[:id])
    hero.destroy
    head :ok, content_type: 'text/html'
  end

  def last
    qty = params[:qty] || 1
    @heroes = Hero.order(id: :desc).limit(qty)
  end

  private

  def hero_params
    params.require(:hero).permit(:name, :alter_ego, :power_id)
  end
end
