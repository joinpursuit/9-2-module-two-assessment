// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  let filmArr;
  const titleDropdown = document.getElementById("titles");
  const movieDescription = document.getElementById("display-info");
  const reviewForm = document.getElementById("user-review");
  const reviewsList = document.getElementById("reviews-list");
  const resetReviews = document.getElementById("reset-reviews");
  const peopleList = document.getElementById("people-list");
  const peopleButton = document.getElementById("show-people");

  fetch("https://ghibliapi.herokuapp.com/films")
    .then((event) => {
      return event.json();
    })
    .then((filmJson) => {
      console.log(filmJson);
      filmArr = filmJson;

      populateOptions(filmJson);

      titleDropdown.addEventListener("change", (event) => {
        genr8MovieDesc(event.target.value);
      });

      peopleButton.addEventListener("click", (event) => {
        fetch("https://ghibliapi.herokuapp.com/people")
          .then((event) => {
            return event.json();
          })
          .then((event) => {
            for (let person of event) {
              for (let film of person.films) {
                if (film.includes(titleDropdown.value)) {
                  const personName = document.createElement("li");
                  personName.innerText = person.name;
                  peopleList.append(personName);
                }
              }
            }
          });
      });

      reviewForm.addEventListener("submit", (event) => {
        const reviewText = document.getElementById("review");
        event.preventDefault();
        const currentMovie = document.getElementById("selected-movie-title");
        const reviewEntry = document.createElement("li");

        if (currentMovie) {
          if (reviewText.value) {
            reviewEntry.innerHTML = `<strong>${currentMovie.innerText}:</strong> ${reviewText.value}`;
            console.log(reviewEntry);
            reviewsList.append(reviewEntry);
            reviewText.value = "";
          } else {
            window.alert("Please write a review before attempting to submit.");
          }
        } else {
          window.alert("Please select a movie first");
        }
      });

      resetReviews.addEventListener("click", (event) => {
        reviewsList.innerHTML = "";
      });
    });

  function populateOptions(filmArr) {
    for (let film of filmArr) {
      const dropdownOption = document.createElement("option");
      dropdownOption.setAttribute("value", `${film.id}`);
      dropdownOption.innerText = film.title;
      titleDropdown.append(dropdownOption);
    }
  }

  function genr8MovieDesc(filmID) {
    if (!filmID) {
      movieDescription.innerHTML = "";
    } else {
      fetch(`https://ghibliapi.herokuapp.com/films/${filmID}`)
        .then((event) => {
          return event.json();
        })
        .then((event) => {
          selectedFilmTitle = event.title;
          movieDescription.innerHTML = `<h3 id="selected-movie-title">${event.title}</h3>
            <p>${event.release_date}</p>
            <p>${event.description}</p>`;
        });
    }
  }

  function genr8People(filmID) {
    if (!filmID) {
      peopleList.innerHTML = "";
    } else {
      fetch(`https://ghibliapi.herokuapp.com/films/${filmID}`)
        .then((event) => {
          return event.json();
        })
        .then((event) => {
          console.log(event);
        });
    }
  }
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
