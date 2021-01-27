class PokemonTrainersController < ApplicationController

    def index
        pokemonTrainers = PokemonTrainer.all

        render json: pokemonTrainers
    end

end
