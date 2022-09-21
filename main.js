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

        const displayInfo = document.querySelector("#display-info");

        const displayTitles = document.querySelector("#display-info h3");
        displayTitles.textContent = `${event.target.title}`;

        const released = document.querySelector("p");

        released.textContent = `${event.target.released_date}`;

        const description = document.querySelector("p:nth-child(2)");

        description.textContent = `${event.target.description}`;

        displayInfo.append(displayTitles, released, description);
      });

      // Add reviews.

      const form = document.querySelector("form");

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        // If no movie selected, error submitting review.

        if (!titles.length) {
          alert("Please select a movie first");
        }

        const review = document.querySelector("#review");
        const ul = document.createElement("ul");
        const li = document.createElement("li");

        review.append(ul);

        li.textContent =
          `<strong>${displayTitles}: </strong> ` +
          `${event.target.review.value}`;

        ul.append(li);
      });

      // Reset reviews button.

      const reset = document.querySelector("#reset-reviews");

      reset.addEventListener("click", (event) => {
        event.preventDefault();

        const ul = document.querySelector("#review ul");

        ul.remove();
      });

      // Show people when button is clicked.

      const people = document.querySelector("#show-people");

      people.addEventListener("click", (event) => {
        event.preventDefault();

        const ol = document.createElement("ol");
        const li = document.createElement("li");
      });
    });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
