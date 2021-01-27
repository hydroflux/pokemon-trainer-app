class Pokemon < ApplicationRecord
    has_many :pokemon_trainers
    has_many :trainers, through: :pokemon_trainers
end
