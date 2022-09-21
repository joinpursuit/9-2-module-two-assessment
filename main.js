const filmsURL = "https://ghibliapi.herokuapp.com/films";
const select = document.querySelector("#titles");

function run() {
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
    document.querySelector("#peopleList").innerHTML = "";
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
  const displayDiv = document.querySelector("#display-info");
  displayDiv.innerHTML = "";
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  p1.textContent = film.title;
  p1.classList.add("movie-title");
  p2.textContent = film.release_date;
  p3.textContent = film.description;

  displayDiv.append(p1, p2, p3);
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
    strong.textContent = document.querySelector(".movie-title").innerText + ":";
    li.innerText = " " + review;
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

function handleShowPeople() {
  const peopleUrl = "https://ghibliapi.herokuapp.com/people";
  const showPeopleBtn = document.querySelector("#show-people");
  showPeopleBtn.addEventListener("click", () => {
    //get all the people, filter people by current movid id
    fetch(peopleUrl)
      .then((res) => res.json())
      .then((allPeople) => {
        console.log("allPeople", allPeople);
        const filmID = select.value;
        console.log(filmID);
        const filteredPeople = allPeople.filter((person) =>
          person.films.some((film) => film.split("/").slice(-1)[0] == filmID)
        );
        console.log(filteredPeople);
        const peopleList = document.querySelector("#peopleList");
        for (let person of filteredPeople) {
          const li = document.createElement("li");
          li.textContent = person.name;
          peopleList.append(li);
        }
      });
  });
}
handleShowPeople();

setTimeout(run, 1000);
