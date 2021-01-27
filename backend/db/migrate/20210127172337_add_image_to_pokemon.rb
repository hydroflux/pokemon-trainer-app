class AddImageToPokemon < ActiveRecord::Migration[6.1]
  def change
    add_column :pokemons, :image, :string
  end
end
