class PokemonTrainersController < ApplicationController

    def index
        pokemonTrainers = PokemonTrainer.all

        render json: pokemonTrainers, include: :pokemon
    end

    def create
        pokemon = Pokemon.find(pokemon_trainer_params[:pokemon_id])
        trainer = Trainer.find(pokemon_trainer_params[:trainer_id])
        pokemonTrainer = PokemonTrainer.create trainer: trainer, pokemon: pokemon

        render json: pokemonTrainer
    end

    def pokemon_trainer_params
        params.require(:pokemon_trainer).permit :trainer_id, :pokemon_id
    end

end
