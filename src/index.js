const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  // getToys();
  const toyCollection = document.querySelector("#toy-collection")
  fetch("http://localhost:3000/toys")
    .then(r => r.json())
    .then(toys => {
      console.log(toys)
      //take toys array and make HTML in order to add to DOM
      let toysHTML = toys.map(function(toy) {
        return `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src= ${toy.image} class="toy-avatar" />
          <p> ${toy.likes} Likes </p>
          <button data-id="${toy.id}" class="like-btn" id="[toy_id]">Like ❤️</button>
        </div>
        `
      })
      toyCollection.innerHTML =
      toysHTML.join('')
    })

  toyFormContainer.addEventListener("submit", function(e){
    e.preventDefault()
    console.log(e.target.name)
    //grab the inputs from form
    const toyName = e.target.name.value
    const toyImage = e.target.image.value
    
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 99
      })
    })
    .then( r=> r.json())
    .then( newToy => {
      let newToyHTML = `
        <div class="card">
            <h2>${newToy.name}</h2>
            <img src= ${newToy.image} class="toy-avatar" />
            <p> ${newToy.likes} Likes </p>
            <button data-id="${newToy.id}" class="like-btn" id="[toy_id]">Like ❤️</button>
          </div>
      `
      toyCollection.innerHTML += newToyHTML
      console.log(e.target.reset())
    })
  })

  toyCollection.addEventListener("click", (e) => {
    if (e.target.className === "like-btn"){
      
      let currentLikes = parseInt(e.target.previousElementSibling.innerText)
      let newLikes = currentLikes + 1
      e.target.previousElementSibling.innerText = newLikes +  "Likes"

      fetch(`http://localhost:3000/toys/
      ${e.target.dataset.id}`)
    }
  })


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
















//   toyFormContainer.addEventListener("submit", (e) => {
//     e.preventDefault()
//     postToy(e.target.name.value, e.target.image.value)
//   })
// });


// function getToys() {
//   fetch("http://localhost:3000/toys")
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     data.map(t => renderToy(t))
//   })
// }

// function renderToy(toy) {
//   const toyCard = `<div class="card">
//   <h2>${toy.name}</h2>
//   <img src=${toy.image} class="toy-avatar" />
//   <p>${toy.likes} Likes</p>
//   <button class="like-btn" id="[toy_id]">Like ❤️</button>
// </div>`

// const toyBox = document.getElementById("toy-collection");
// toyBox.innerHTML += toyCard;

// }

// function postToy(name, url) {
//   fetch("http://localhost:3000/toys", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: JSON.stringify({
//       "name": name,
//       "image": url,
//       "likes": 0
//     })
//   })
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//       renderToy(data)
//     })
// }



// function handleLikeButton(e) {
//   const toyID = e.target.parentElement.dataset.id;
//   const likeCount = parseInt(e.target.parentElement.children[2].innerText.split(" ")[0]);
//   const likeData = {
//     likes: likeCount +1
//   }
//   const reqObj = {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify(likeData)
//   }


//   fetch("http://localhost:3000/toys" +`/${toyID}`, reqObj)
//     .then(function(response){
//       return response.json();
//     })
//     .then(function(data){
//       console.log(data);
//       getToys();
//     })
//     .catch(function(err){
//       console.log(err);
//     })
// }

// document.addEventListener("click", function(e){
//   if(e.target.className === "like-btn") {
//     handleLikeButton(e);
//   }
// }
//
