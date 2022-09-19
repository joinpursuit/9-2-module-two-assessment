const filmsURL = "https://ghibliapi.herokuapp.com/films";
const select = document.querySelector("#titles");

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here

  fetch(filmsURL)
    .then((res) => res.json())
    .then((films) => injectOptionElements(films))
    .catch((err) => console.log(err));
}

function injectOptionElements(films) {
  console.log(films);
  for (let film of films) {
    const option = document.createElement("option");
    option.textContent = film.title;
    option.setAttribute("value", film.id);
    select.append(option);
  }
}

function handleSelectValueChange() {
  select.addEventListener("change", (e) => {
    console.log(e.target.value);
    const filmID = e.target.value;
    const filmByID = `https://ghibliapi.herokuapp.com/films/${filmID}`;
    fetch(filmByID)
      .then((res) => res.json())
      .then((film) => showMovieDetails(film))
      .catch((err) => console.log(err));
  });
}
handleSelectValueChange();

function showMovieDetails(film) {
  console.log(film);
  const movieTitle = document.querySelector(".movie-title");

  const displayDiv = document.querySelector(".display-info");
  movieTitle.textContent = film.title;
  displayDiv.innerText = film.description;
}
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
