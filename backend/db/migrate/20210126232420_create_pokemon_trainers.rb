class CreatePokemonTrainers < ActiveRecord::Migration[6.1]
  def change
    create_table :pokemon_trainers do |t|
      t.references :pokemon, null: false, foreign_key: true
      t.references :trainer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
