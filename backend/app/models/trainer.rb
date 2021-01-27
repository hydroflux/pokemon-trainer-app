class Trainer < ApplicationRecord
    has_many :pokemon_trainers
    has_many :pokemon, through: :pokemon_trainers
end
