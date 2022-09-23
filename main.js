function selectionMenu(json) {
  const select = document.querySelector("#titles");
  json.forEach((movieT) => {
    // console.log(movieT.title)
  const options = document.createElement("option")
  options.setAttribute("value", `${movieT.title}`)
  options.textContent = `${movieT.title}`
  select.append(options)
   });
}


const films = "https://ghibliapi.herokuapp.com/films";

fetch(films)
    .then(response => response.json())
    .then(display)

function display(json, j, userSelected) {
  const select = document.querySelector("#titles");
  const display = document.querySelector("#display-info")
 
  select.addEventListener("change", (event) => {
    event.preventDefault();
   userSelected = event.target.value;
    console.log(userSelected)
    display.textContent = ""
    const title = document.createElement("h3")
    title.textContent = `${userSelected}`
      j = json.find(m => m.title ===  userSelected)
  console.log(j)
const releaseYear = document.createElement("p")
const description = document.createElement("p")
releaseYear.textContent = j.release_date
 description.textContent = j.description
 display.append(title,releaseYear,description)

})

}



function getReview(j) {
 
  const review = document.querySelector("#review")
  review.addEventListener("submit", (event) => {
event.preventDefault()
const reviewValue = event.target.value;
const li = document.createElement("li");
li.innerHTML = `<strong>${j}:</strong> ${reviewValue}`

    document.querySelector("#reviews ul").append(li)
    event.target.reset();
  })
}

 

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  const films = "https://ghibliapi.herokuapp.com/films";

  fetch(films)
    .then((response) => response.json())
    .then(selectionMenu,display,getReview);








}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
