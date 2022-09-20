function selectionMenu(json) {
  const select = document.querySelector("#titles");
  json.forEach((movieT) => {
    // console.log(movieT.title)
  const options = document.createElement("option")
  options.setAttribute("value", `${movieT.title}`)
  options.textContent = `${movieT.title}`
  select.append(options)
   });

   const movieDetails(json) {
const displayDetails = document.querySelector("#display-info")
   }

}

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  const films = "https://ghibliapi.herokuapp.com/films";

  fetch(films)
    .then((response) => response.json())
    .then(selectionMenu, movieDetails);
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
