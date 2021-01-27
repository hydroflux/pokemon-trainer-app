const queryParams = new URLSearchParams(window.location.search)
const pokemonId = queryParams.get('id')

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
    .then( response => response.json() )
    .then( pokemon => {
        const pokeTitle = document.createElement('title')
        const spriteImage = document.createElement('img')
        const pokeName = document.createElement('h1')
        const pokeType = document.createElement('h2')

        spriteImage.src = pokemon.sprites.front_default
        pokeTitle.textContent = pokemon.forms[0].name
        pokeName.textContent = capitalize(pokemon.forms[0].name)
        pokeType.textContent = capitalize(pokemon.types[0].type)

        document.head.append(pokeTitle)
        document.body.append(pokeName, spriteImage, pokeType)
    })

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
    }