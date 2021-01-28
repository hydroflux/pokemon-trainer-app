const addTrainerForm = document.getElementById("add-trainer");
const addTrainerButton = document.getElementById("add-trainer-submit");

console.log(addTrainerForm.name.textContent)

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
            document.location.href = `http://localhost:3001/trainer.html?id=${trainer.id}`
        )



  event.target.reset()
})


// document.location.href = `http://localhost:3001/trainer?name=${loginForm.name}`
    // document.location.href = `www.google.com`

// const loginForm = document.getElementById("login-form");
// const loginButton = document.getElementById("login-form-submit");
// const loginErrorMsg = document.getElementById("login-error-msg");

// loginButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     const username = loginForm.username.value;
//     const password = loginForm.password.value;

//     if (username === "user" && password === "web_dev") {
//         alert("You have successfully logged in.");
//         location.reload();
//     } else {
//         loginErrorMsg.style.opacity = 1;
//     }
// })