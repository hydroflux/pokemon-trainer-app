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


// const pokemonURL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=988`
const pokemonURL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=150`

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
            const flipCard = document.createElement("div")
            const flipCardInner = document.createElement("div")
            const pokeCardFront = document.createElement("div")
            const spriteImageFront = document.createElement("img")
            const pokeMoves = document.createElement("ul")
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
            pokeMoves.classList = "card-body"
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

                    console.log(pokemonInfo)

                    pokeMoves.textContent = `${pokeName}'s Moves:`
                    const fourRandomMoves = getRandomSubarray(pokemonInfo.moves, 4);
                    fourRandomMoves.forEach( move => {
                        li = document.createElement("li")
                        
                        li.textContent = capitalize(move.move.name)

                        pokeMoves.appendChild(li)
                    })

                    spriteImageFront.src = pokeSpriteFront
                    spriteImageBack.src = pokeSpriteBack
                    cardText.textContent = pokeType                    


                fetch(pokemonInfo.species.url)
                    .then( response => response.json() )
                    .then( pokemonSpecies => {
                        console.log(pokemonSpecies.flavor_text_entries[0])
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
            
            cardBody.append(cardTitle, cardText, addPokemon)
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

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
    }

function getRandomSubarray(array, size) {
    let shuffled = array.slice(0), i = array.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}
