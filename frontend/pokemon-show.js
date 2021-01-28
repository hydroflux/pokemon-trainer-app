const queryParams = new URLSearchParams(window.location.search)
const trainerID = queryParams.get("trainer_id")
fetch(`http://localhost:3000/trainers/${trainerID}`)
    .then( response => response.json() )
    .then( trainer => {
        const trainerHeader = document.querySelector("h1")
        const myTeamLink = document.getElementById("my-team-link")

        trainerHeader.textContent = `${trainer.name}, choose Your Pokemon!`
        myTeamLink.href = `trainer.html?trainer_id=${trainer.id}`
    })


const pokemonURL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=988`
fetch(pokemonURL)
    .then( response => response.json() )
    .then( pokemons => {
        const outerContainer = document.createElement("div")
        const pokeRow = document.createElement("div")

        outerContainer.classList = "container px-5 py-5"
        pokeRow.classList = "row"

        pokemons.results.forEach( pokemon => {
            const pokeName = capitalize(pokemon.name)

            const pokeColumn = document.createElement("div")
            const pokeCard = document.createElement("div")
            const spriteImage = document.createElement("img")
            const cardBody = document.createElement("div")
            const cardTitle = document.createElement("h5")
            const cardText = document.createElement("p")
            const addPokemon = document.createElement("a")

            pokeColumn.classList = "col mx-1"
            pokeCard.classList = "card"
            cardBody.classList = "card-body"
            cardTitle.classList = "card-title"
            addPokemon.classList = "btn btn-primary"
            
            pokeCard.setAttribute("style", "width: 18rem;")

            fetch(pokemon.url)
                .then( response => response.json() )
                .then( pokemonInfo => {
                    let pokeType = capitalize(pokemonInfo.types[0].type.name)
                    let pokeSprite = pokemonInfo.sprites.front_default

                    spriteImage.src = pokeSprite
                    cardText.textContent = pokeType                    
            })
        
            cardTitle.textContent = pokeName
            addPokemon.textContent = "Add Pokemon"

            addPokemon.addEventListener('click', event => {
                event.preventDefault();

                fetch(pokemon.url)
                    .then( response => response.json() )
                    .then( pokemonInfo => {
                        // console.log(pokemonInfo)
                        // console.log(pokemonInfo.types[0])
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
            
            cardBody.append(cardTitle, cardText, addPokemon)
            pokeCard.append(spriteImage, cardBody)
            pokeColumn.appendChild(pokeCard)
            pokeRow.appendChild(pokeColumn)
        })

        outerContainer.appendChild(pokeRow)
        document.body.appendChild(outerContainer)
    })

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
    }
