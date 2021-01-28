const addTrainerForm = document.getElementById("add-trainer");
const addTrainerButton = document.getElementById("add-trainer-submit");

addTrainerForm.addEventListener('submit', event => {
  event.preventDefault();
  
  const addTrainerFormData = new FormData(event.target);
  const trainerName = addTrainerFormData.get('name')
  const trainerGender = addTrainerFormData.get('gender')

  fetch("http://localhost:3000/trainers", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ trainer: { name: trainerName, gender: trainerGender }})
  })
    .then( response => response.json() )
    .then( trainer => 
            // document.location.href = `http://localhost:3001/trainer.html?id=${trainer.id}`
            document.location.href = `http://localhost:3001/pokemon.html?trainer_id=${trainer.id}`
        )



  event.target.reset()
})