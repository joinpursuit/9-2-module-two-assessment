// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  fetch("https://ghibliapi.herokuapp.com/films")
    .then((res) => res.json())
    .then((films) => {
      films.forEach((film) => {
        selectFilm.append(createFilmOption(film));
        movieArr.push(film);
        // console.log(film);
      });
    })
    .catch((err) => {
      console.log(err);
    });

  const selectFilm = document.getElementById("titles");
  const movieDetails = document.getElementById("display-info");
  const userReview = document.getElementById("review");
  const reviewForm = document.querySelector("form");
  const resetBtn = document.getElementById("reset-reviews");
  const reviewList = document.querySelector("ul");
  const showPeopleBtn = document.getElementById("show-people");
  const peopleList = document.querySelector("ol");
  const movieArr = [];

  const createFilmOption = (film) => {
    const option = document.createElement("option");
    option.textContent = film.title;
    option.setAttribute("value", film.id);
    return option;
  };

  const createFilmDetail = (film, div) => {
    // have to take out prevous film details, if i don't the film info will just
    // add on to the recent film detail
    movieDetails.innerText = ""; // removes old info

    const filmTitle = document.createElement("h3"); // adds new info
    const releaseDate = document.createElement("p");
    const description = document.createElement("p");

    filmTitle.textContent = film.title;
    releaseDate.textContent = film.releaseDate;
    description.textContent = film.description;

    div.append(filmTitle, releaseDate, description);
  };

  selectFilm.addEventListener("change", (e) => {
    e.preventDefault();

    const filmInfo = e.target.value;
    const foundfilm = movieArr.find((film) => {
      return film.id == filmInfo;
    });
    createFilmDetail(foundfilm, movieDetails);
  });

  const createReviewList = (film, list, review) => {
    const reviewItem = document.createElement("li");
    reviewItem.innerHTML = `<strong>${film.title}:</strong> ${review}`;
    list.append(reviewItem);
  };

  const resetListOfReviews = () => {
    const listElements = document.querySelectorAll("ul li");
    if (listElements) {
      listElements.forEach((li) => {
        li.remove();
      });
    }
  };

  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const foundFilm = movieArr.find((film) => {
      return film.id == selectFilm.value;
    });
    const review = userReview.value;

    createReviewList(foundFilm, reviewList, review);
    userReview.value = "";
  });

  resetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    resetListOfReviews();
  });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
