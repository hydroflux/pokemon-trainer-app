# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
PokemonTrainer.destroy_all
Trainer.destroy_all
Pokemon.destroy_all

bulbasaur = Pokemon.create name: "Bulbasaur", pokeType: "Grass", image: "https://img.pokemondb.net/sprites/diamond-pearl/normal/bulbasaur.png"
squirtle = Pokemon.create name: "Squirtle", pokeType: "Water", image: "https://img.pokemondb.net/sprites/diamond-pearl/normal/squirtle.png"
charmander = Pokemon.create name: "Charmander", pokeType: "Fire", image: "https://img.pokemondb.net/sprites/diamond-pearl/normal/charmander.png"
pidgey = Pokemon.create name: "Pidgey", pokeType: "Normal", image: "https://img.pokemondb.net/sprites/diamond-pearl/normal/pidgey.png"
pikachu = Pokemon.create name: "Pikachu", pokeType: "Electric", image: "https://img.pokemondb.net/sprites/diamond-pearl/normal/pikachu.png"
gengar = Pokemon.create name: "Gengar", pokeType: "Ghost", image:"https://img.pokemondb.net/sprites/diamond-pearl/normal/gengar.png"
mew = Pokemon.create name: "Mew", pokeType: "Psychic", image: "https://img.pokemondb.net/sprites/diamond-pearl/normal/mew.png"

jack = Trainer.create name: "Jack", gender: "Male"
obinna = Trainer.create name: "Obinna", gender: "Male"
reed = Trainer.create name: "Reed", gender: "Male"

PokemonTrainer.create trainer: jack, pokemon: gengar
PokemonTrainer.create trainer: jack, pokemon: squirtle
PokemonTrainer.create trainer: jack, pokemon: pikachu
PokemonTrainer.create trainer: obinna, pokemon: mew
PokemonTrainer.create trainer: obinna, pokemon: charmander
PokemonTrainer.create trainer: reed, pokemon: pidgey
PokemonTrainer.create trainer: reed, pokemon: bulbasaur
