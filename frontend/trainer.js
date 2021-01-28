console.log("Trainers Javascript working!")

const queryParams = new URLSearchParams(window.location.search)
const trainerId = queryParams.get('id')

fetch(`http://localhost:3000/trainers/${trainerId}`)
    .then( response => response.json() )
    .then( trainer => {
        trainerName = document.createElement('h1')
        trainerName.textContent = trainer.name

        trainerSprite = document.createElement('img')
        if (trainer.gender === "boy") {
            trainerSprite.src = "img/boy-sprite.png"
        } else if (trainer.gender === "girl") {
            trainerSprite.src = "img/girl-sprite.png"
        }
    
        document.body.appendChild(trainerName)
    })