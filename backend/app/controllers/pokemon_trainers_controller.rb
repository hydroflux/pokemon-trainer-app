class PokemonTrainersController < ApplicationController

    def index
        pokemonTrainers = PokemonTrainer.all

        render json: pokemonTrainers, include: :pokemon
    end

    def show
        pokemonTrainer = PokemonTrainer.find(params[:id])

        render json: pokemonTrainer
    end

    def create
        trainer = Trainer.find(pokemon_trainer_params[:trainer_id])
        if Pokemon.find_by(id: pokemon_trainer_params[:pokemon_id])
            pokemon = Pokemon.find_by(id: pokemon_trainer_params[:pokemon_id])
        else
            pokemon = Pokemon.create id: pokemon_trainer_params[:pokemon_id], name: pokemon_trainer_params[:name], pokeType: pokemon_trainer_params[:pokeType], image: pokemon_trainer_params[:image]
        end
        pokemonTrainer = PokemonTrainer.create trainer: trainer, pokemon: pokemon        
        render json: pokemonTrainer
    end

    def pokemon_trainer_params
        params.require(:pokemon_trainer).permit :trainer_id, :pokemon_id, :name, :pokeType, :image
    end

    def destroy
        pokemonTrainer = PokemonTrainer.find(params[:id])
        pokemonTrainer.destroy

        render json: pokemonTrainer
    end

end
