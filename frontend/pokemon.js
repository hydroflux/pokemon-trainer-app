const pokemonURL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=150`

const queryParams = new URLSearchParams(window.location.search)
const pokemonId = queryParams.get('id')

fetch(pokemonURL)
    .then( response => response.json() )
    .then( pokemons => {
        pokemons.results.forEach( pokemon => {
            console.log(pokemon)
            const pokeCard = document.createElement('div')
            const pokeContainer = document.createElement('div')
            pokeCard.classList = 'poke-card'
            pokeContainer.classList = 'poke-info'

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
                    pokeType.href = capitalize(pokemonInfo.types[0].type.url)
                })


            pokeContainer.append(pokeName, pokeType)
            pokeCard.append(spriteImage, pokeContainer)
            document.body.appendChild(pokeCard)
        })
    })
        
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
    }