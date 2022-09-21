// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  const ghibliFilms = "https://ghibliapi.herokuapp.com/films";

  fetch(ghibliFilms)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);

      // Add movie titles to select menu.

      const titles = document.querySelector("#titles");

      for (let i = 0; i < json.length; i++) {
        const option = document.createElement("option");
        const { id, title, release_date, description } = json[i];
        option.value = id;
        option.textContent = title;
        titles.append(option);
      }

      // Change movie description when a movie is selected.

      titles.addEventListener("change", (event) => {
        event.preventDefault();

        const displayTitles = document.querySelector("#display-info h3");
        displayTitles.textContent = `${event.target.textContent}`;

        const released = document.querySelector("p");

        released.textContent = `${event.target.released_date}`;

        const description = document.querySelector("p:nth-child(2)");

        description.textContent = `${event.target.description}`;
      });

      // Add reviews.
    });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
