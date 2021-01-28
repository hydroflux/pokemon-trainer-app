

const queryParams = new URLSearchParams(window.location.search)
const pokemonId = queryParams.get('id')

fetch(pokemonURL)
    .then( response => response.json() )
    .then( pokemons => {
        pokemons.results.forEach( pokemon => {
            console.log(pokemon)
            const pokeCard = document.createElement('div')
            const pokeContainer = document.createElement('div')
            const addPokemon = document.createElement('button')

            pokeCard.classList = 'poke-card'
            pokeContainer.classList = 'poke-info'

            addPokemon.setAttribute("type", "button")
            addPokemon.textContent = "Add Pokemon"

            const spriteImage = document.createElement('img')
            const pokeName = document.createElement('h4')
            const pokeType = document.createElement('a')

            fetch(pokemon.url)
                .then( response => response.json() )
                .then( pokemonInfo => {
                    console.log(pokemonInfo.types[0])
                    spriteImage.src = pokemonInfo.sprites.front_default
                    pokeName.textContent = capitalize(pokemonInfo.forms[0].name)
                    pokeType.textContent = capitalize(pokemonInfo.types[0].type.name)
                    // pokeType.href = capitalize(pokemonInfo.types[0].type.url)
                })


            pokeContainer.append(pokeName, pokeType, addPokemon)
            pokeCard.append(spriteImage, pokeContainer)
            document.body.appendChild(pokeCard)
        })
    })