console.log("JavaScript Started!")

fetch("https://pokeapi.co/api/v2/pokemon/382/")
    .then( response => response.json() )
    .then( pokemon => {
        console.log(pokemon)

        p = document.createElement('p')
        spriteImage = document.createElement('img')

        typeName = document.createElement('a')


        spriteImage.src = (pokemon.sprites.front_default)
        p.textContent = pokemon.moves[0].move.name

        pokemon

        document.body.appendChild(spriteImage)
        document.body.appendChild(p)
    })



