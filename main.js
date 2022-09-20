// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  fetch("https://ghibliapi.herokuapp.com/films")
    .then((response) => response.json())
    .then((films) => {
      console.log(films);
      console.log(films[0]);
      console.log(films[0].title);
      // Loop through films array
      // create and add an option to select for each film
      films.forEach((film) => {
        const option = document.createElement("option");
        option.innerText = film.title;
        document.querySelector("#titles").append(option);
      });
    });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
