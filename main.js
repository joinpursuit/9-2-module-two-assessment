const filmsURL = "https://ghibliapi.herokuapp.com/films";

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  fetch(filmsURL)
    .then((res) => res.json())
    .then((films) => injectOptionElements(films))
    .catch((err) => console.log(err));
}

function injectOptionElements(films) {
  const select = document.querySelector("#titles");
  console.log(films);
  for (let film of films) {
    const option = document.createElement("option");
    option.id = film.id;
    option.textContent = film.title;
    option.setAttribute("value", option.title);
    select.append(option);
  }
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
