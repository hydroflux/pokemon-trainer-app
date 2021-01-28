class TrainersController < ApplicationController

    def index
        trainers = Trainer.all

        render json: trainers, include: :pokemon
    end

    def show
        trainer = Trainer.find(params[:id])
        render json: trainer, include: :pokemon
    end
    
    def create
        trainer = Trainer.create trainer_params
        render json: trainer
    end

    def trainer_params
        params.require(:trainer).permit :name, :gender
    end

end