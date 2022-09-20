// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  let filmsArray;
  const selectElement = document.querySelector("#titles");

  fetch("https://ghibliapi.herokuapp.com/films")
    .then((response) => response.json())
    .then((films) => {
      filmsArray = films;
      console.log(films);
      console.log(films[0]);
      console.log(films[0].title);
      // Loop through films array
      // create and add an option to select for each film
      films.forEach((film, i) => {
        const option = document.createElement("option");
        option.innerText = film.title;
        option.setAttribute("value", i);
        document.querySelector("#titles").append(option);
      });
    });

  // Select Event listener to populate #display-info with movie details
  selectElement.addEventListener("change", (event) => {
    event.preventDefault();
    // Clear the display-info field before adding elements
    document.querySelector("#display-info").innerHTML = "";
    // Populate movie details
    const h3 = document.createElement("h3");
    const pMovieRelease = document.createElement("p");
    const pMovieDescription = document.createElement("p");
    let film = filmsArray[event.target.value];
    h3.innerText = film.title;
    pMovieRelease.innerText = film.release_date;
    pMovieDescription.innerText = film.description;
    console.log(event.target.value);
    document
      .querySelector("#display-info")
      .append(h3, pMovieRelease, pMovieDescription);
  });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
