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

// select feature
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

function handleReviewSubmit() {
  const reviewForm = document.querySelector("#review-form");
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // if no movie is selected, alert
    if (!select.value) {
      alert("Please select a movie first");
      return;
    }

    // if selected, get user input
    console.log(e.target.review.value);
    const review = e.target.review.value;
    e.target.review.value = "";

    // then show review
    const reviewList = document.querySelector(".reviews-list");
    const li = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = document.querySelector(".movie-title").innerText;
    li.innerText = ": " + review;
    li.prepend(strong);
    reviewList.append(li);
  });
}
handleReviewSubmit();

function handleResetReviews() {
  const deleteBtn = document.querySelector("#reset-reviews");
  deleteBtn.addEventListener("click", () => {
    const reviewsList = document.querySelector(".reviews-list");
    reviewsList.innerHTML = "";
  });
}
handleResetReviews();
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
