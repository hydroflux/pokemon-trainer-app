const queryParams = new URLSearchParams(window.location.search)
const trainerId = queryParams.get('trainer_id')

fetch(`http://localhost:3000/trainers/${trainerId}`)
    .then( response => response.json() )
    .then( trainer => {
        const trainerHeader = document.querySelector('h1')
        const pokedexLink = document.getElementById("pokedex-link")

        trainerHeader.textContent = `${trainer.name}, here are your Pokemon!`
        pokedexLink.href = `pokemon.html?trainer_id=${trainer.id}`
    
        const trainerPokemon = trainer.pokemon

        const outerContainer = document.createElement("div")
        const pokeRow = document.createElement("div")
        
        outerContainer.classList = "container px-5 py-5"
        pokeRow.classList = "row"

        trainerPokemon.forEach( pokemon => {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`)
                .then( response => response.json() )
                .then( pokemonInformation => {
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
                    const removePokemon = document.createElement("a")
            
                    pokeColumn.classList = "col mx-1"
                    flipCard.classList = "flip-card"
                    flipCardInner.classList = "flip-card-inner"
                    pokeCardFront.classList = "card flip-card-front"
                    pokeCardBack.classList = "card flip-card-back"
                    cardBody.classList = "card-body"
                    pokeDescription.classList = ("card-body")
                    cardTitle.classList = "card-title"
                    removePokemon.classList = "btn btn-primary"
                    
                    pokeCardFront.setAttribute("style", "width: 18rem;")
                    pokeCardBack.setAttribute("style", "width: 18rem;")

                    const pokeType = capitalize(pokemonInformation.types[0].type.name)
                    const pokeSpriteFront = pokemonInformation.sprites.front_default
                    const pokeSpriteBack = pokemonInformation.sprites.back_default

                    spriteImageFront.src = pokeSpriteFront
                    spriteImageBack.src = pokeSpriteBack
                    cardText.textContent = pokeType

                fetch(pokemonInformation.species.url)
                    .then( response => response.json() )
                    .then( pokemonSpecies => {
                        pokeDescription.textContent = pokemonSpecies.flavor_text_entries[0].flavor_text
                    })
                
                cardTitle.textContent = capitalize(pokemon.name)
                removePokemon.textContent = "Remove Pokemon"

                removePokemon.addEventListener('click', event => {
                    event.preventDefault();

                    fetch("http://localhost:3000/pokemon_trainers")
                        .then( response => response.json() )
                        .then( pokemonTrainers => {
                            const pokemonTrainerRelationship = pokemonTrainers.find( pokemonTrainer => pokemonTrainer.pokemon_id === pokemon.id && pokemonTrainer.trainer_id == trainerId)

                            fetch(`http://localhost:3000/pokemon_trainers/${pokemonTrainerRelationship.id}`, {
                                method: "DELETE",
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                }})
                                .then( response => response.json() )
                                .then( pokemonTrainer => {
                                    removePokemon.textContent = `${capitalize(pokemon.name)} Removed!`
                            })
                        })
                })

                cardBody.append(cardTitle, cardText)
                pokeCardFront.append(spriteImageFront, cardBody)
                pokeCardBack.append(spriteImageBack, pokeDescription, removePokemon)
                flipCardInner.append(pokeCardFront, pokeCardBack)
                flipCard.append(flipCardInner)
                pokeColumn.appendChild(flipCard)
                pokeRow.appendChild(pokeColumn)
            })

            outerContainer.appendChild(pokeRow)
            document.body.appendChild(outerContainer)
        })
    })

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
    }