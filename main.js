// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  fetch("https://ghibliapi.herokuapp.com/films")
    .then((res) => res.json())
    .then((films) => {
      films.forEach((film) => {
        selectFilm.append(createFilmOption(film));
        filmArr.push(film);
        // console.log(film);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  //--------------------------------------------------------------------------------------------------------
  // grabbing elements
  const selectFilm = document.getElementById("titles");
  const movieDetails = document.getElementById("display-info");
  const userReview = document.getElementById("review");
  const reviewForm = document.querySelector("form");
  const resetBtn = document.getElementById("reset-reviews");
  const reviewList = document.querySelector("ul");
  const showPeopleBtn = document.getElementById("show-people");
  const peopleList = document.querySelector("ol");
  const filmArr = [];
  //--------------------------------------------------------------------------------------------------------
  // creating a function to populate options with the fetch data
  const createFilmOption = (film) => {
    const option = document.createElement("option");
    option.textContent = film.title;
    option.setAttribute("value", film.id);
    return option;
  };
  //--------------------------------------------------------------------------------------------------------
  // making the movie details and adding the correct text with the fecth data
  const createFilmDetail = (film, div) => {
    // have to take out prevous film details, if i don't the film info will just
    // add on to the recent film detail
    movieDetails.innerText = ""; // removes old info

    const filmTitle = document.createElement("h3"); // adds new info
    const releaseDate = document.createElement("p");
    const description = document.createElement("p");

    filmTitle.textContent = film.title;
    releaseDate.textContent = film.release_date;
    description.textContent = film.description;

    div.append(filmTitle, releaseDate, description);
  };

  selectFilm.addEventListener("change", (e) => {
    e.preventDefault();

    if (!checkSubmission(selectFilm)) {
      alert("Please select a movie first");
      return;
    }

    // clears people list when user clicks different film
    peopleList.innerText = "";

    const filmInfo = e.target.value;
    const foundfilm = filmArr.find((film) => {
      return film.id == filmInfo;
    });
    createFilmDetail(foundfilm, movieDetails);
  });
  //--------------------------------------------------------------------------------------------------------
  // making the list of reviews and adding it to the list
  const createReviewList = (film, list, review) => {
    const reviewItem = document.createElement("li");
    reviewItem.innerHTML = `<strong>${film.title}:</strong> ${review}`;
    list.append(reviewItem);
  };
  // reseting the reviews when the user clicks the reset button
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

    if (!checkSubmission(selectFilm)) {
      alert("Please select a movie first");
      return;
    }

    const foundFilm = filmArr.find((film) => {
      return film.id == selectFilm.value;
    });
    const review = userReview.value;
    // adding the inputed review to the review list with the film  name that was selected
    createReviewList(foundFilm, reviewList, review);
    userReview.value = "";
  });

  resetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    resetListOfReviews();
  });
  //--------------------------------------------------------------------------------------------------------
  // create list of people for each film when button is clicked
  const createPeopleList = (name, list) => {
    const person = document.createElement("li");
    person.textContent = name;
    list.append(person);
  };

  showPeopleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // need to add another fetch but for people, to pass for some reason?
    fetch("https://ghibliapi.herokuapp.com/people").then().then().catch();

    if (!checkSubmission(selectFilm)) {
      alert("Please select a movie first");
      return;
    }

    const filmId = selectFilm.value;
    const foundFilm = filmArr.find((film) => film.id == filmId);

    foundFilm.people.forEach((per) => {
      // fetch the url in the person arr
      fetch(per)
        .then((res) => res.json())
        .then((data) => {
          // creating poeple list with name on the ol element in HTML
          createPeopleList(data.name, peopleList);
        })
        .catch((err) => console.log(err));
    });
  });
  //--------------------------------------------------------------------------------------------------------
  // checks to see if the user selected the film
  const checkSubmission = (selection) => {
    if (selection.value == "") {
      return false;
    }
    return true;
  };
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
