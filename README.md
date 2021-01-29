# General Info

Pokemon trainer app allows a user to create an account as a pokemon trainer, selects pokemon characters from a list of prepopulated pokemon characters and adds those pokemons to his trainer profile.

A trainer is able to delete selected pokemon characters.

# Demo Video

[Pokemon Trainer Application Demo](https://youtu.be/T5to9VyNNBM)

# Technologies
- Active Record - version 6.0
- Bootstrap - Version 5
- Ruby - Version 2.6.5
- Sinatra - Version 2.0
- Sqlite3 -Version 1.4
- HTML 5
- CSS 3
- JavaScript
- Pokemon API

# Setup

To clone this repository in your terminal type:

```
git clone git@github.com:hydroflux/pokemon-trainer-app
```

run

```

bundle init
bundle install
rails s
npx lite-server

```
# Code Examples

``` javascript
# Dynamically Load Flipping Pokemon Cards
fetch(pokemonURL)
    .then( response => response.json() )
    .then( pokemons => {
        const outerContainer = document.createElement("div")
        const pokeRow = document.createElement("div")
        
        outerContainer.classList = "container px-5 py-5"
        pokeRow.classList = "row"

        if (typeID) {
            pokemons = pokemons.pokemon
        } else {
            pokemons = pokemons.results
        }

        pokemons.forEach( pokemon => {

            if (typeID) { pokemon = pokemon.pokemon } 

            const pokeName = capitalize(pokemon.name)

            const pokeColumn = document.createElement("div")
            const flipCard = document.createElement("div")
            const flipCardInner = document.createElement("div")
            const pokeCardFront = document.createElement("div")
            const spriteImageFront = document.createElement("img")
            const pokeCardBack = document.createElement("div")
            const spriteImageBack = document.createElement("img")
            const cardBody = document.createElement("div")
            const cardTitle = document.createElement("h5")
            const cardText = document.createElement("p")
            const pokeDescription = document.createElement("p")
            const addPokemon = document.createElement("a")

            pokeColumn.classList = "col mx-1"
            flipCard.classList = "flip-card"
            flipCardInner.classList = "flip-card-inner"
            pokeCardFront.classList = "card flip-card-front"
            pokeCardBack.classList = "card flip-card-back"
            cardBody.classList = "card-body"
            pokeDescription.classList = ("card-body")
            cardTitle.classList = "card-title"
            addPokemon.classList = "btn btn-primary"
            
            pokeCardFront.setAttribute("style", "width: 18rem;")
            pokeCardBack.setAttribute("style", "width: 18rem;")

            fetch(pokemon.url)
                .then( response => response.json() )
                .then( pokemonInfo => {
                    let pokeType = capitalize(pokemonInfo.types[0].type.name)
                    let pokeSpriteFront = pokemonInfo.sprites.front_default
                    let pokeSpriteBack = pokemonInfo.sprites.back_default

                    spriteImageFront.src = pokeSpriteFront
                    spriteImageBack.src = pokeSpriteBack
                    cardText.textContent = pokeType                    

                fetch(pokemonInfo.species.url)
                    .then( response => response.json() )
                    .then( pokemonSpecies => {
                        pokeDescription.textContent = pokemonSpecies.flavor_text_entries[0].flavor_text
                    })
            })
        
            cardTitle.textContent = pokeName
            addPokemon.textContent = "Add Pokemon"

            addPokemon.addEventListener('click', event => {
                event.preventDefault();

                fetch(pokemon.url)
                    .then( response => response.json() )
                    .then( pokemonInfo => {
                        const pokeType = capitalize(pokemonInfo.types[0].type.name)
                        const pokeSprite = pokemonInfo.sprites.front_default
                        const pokemonID = pokemonInfo.id

                        fetch("http://localhost:3000/pokemon_trainers", {
                            method: "POST",
                            headers: {
                                'Content-type': 'application/json',
                                'Accept': 'application/json'
                        },
                            body: JSON.stringify({ pokemon_trainer: { trainer_id: trainerID, pokemon_id: pokemonID, name: pokeName, pokeType: pokeType, image: pokeSprite }})
                        })
                            .then( response => response.json() )
                            .then( pokemonTrainer => {
                                addPokemon.textContent = `${capitalize(pokemon.name)} Added!`
                            })
                })
            })
            
            cardBody.append(cardTitle, cardText)
            pokeCardFront.append(spriteImageFront, cardBody)
            pokeCardBack.append(spriteImageBack, pokeDescription, addPokemon)
            flipCardInner.append(pokeCardFront, pokeCardBack)
            flipCard.append(flipCardInner)
            pokeColumn.appendChild(flipCard)
            pokeRow.appendChild(pokeColumn)
        })

        outerContainer.appendChild(pokeRow)
        document.body.appendChild(outerContainer)
    })
```

# Features
- Create a User/Trainer
- View all characters provided by the [Pokemon Api](https://pokeapi.co/), including their fighting types & descriptions
- Select Pokemon for your team
- View your current team members
- Remove Pokemon from your team

# To Do List
- Add passwords to enable persisting accounts
- Create individual Pokemon cards displaying additional information
- DRY out some of the JavaScript with helper functions

# Status
- Project is complete and up to projected functionality
- There is room for code refactoring & additional functionality

# Contact
- Created by [Obinna Nwabia](github.com/coremand), [Jack Hubert](github.com/hydroflux), & [Reed Roffis](github.com/reedroffis)
- Please contact us if you have any questions!
