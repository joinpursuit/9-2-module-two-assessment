// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  const base_url = "https://ghibliapi.herokuapp.com/films/";
  const people_url = "https://ghibliapi.herokuapp.com/people";
  const select = document.querySelector("#titles");
  const display_info = document.querySelector("#display-info");
  const ul = document.querySelector("ul");
  const form = document.querySelector("form");
  const reset_button = document.querySelector("#reset-reviews");
  const people_button = document.querySelector("#show-people");
  const ol = document.querySelector("ol");

  fetch(base_url)
    .then((res) => res.json())
    .then((data) => {
      createOptions(data);

      // event listener to add reviews
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (select.value === "") {
          alert("Please select a movie first");
        } else {
          for (let d of data) {
            if (d.id === select.value) {
              const review_details = event.target.review.value;
              const li = document.createElement("li");
              li.innerHTML = `<strong>${d.title}:</strong> ${review_details}`;
              ul.append(li);
              form.reset();
            }
          }
        }
      });
    })
    .catch((err) => console.log(err));

  // function to create options
  function createOptions(data) {
    for (let d of data) {
      const option = document.createElement("option");
      option.setAttribute("value", d.id);
      option.textContent = d.title;

      select.append(option);
    }
  }

  // event listener to get the names of people associated with the movie
  people_button.addEventListener("click", (event) => {
    event.preventDefault();

    fetch(people_url)
      .then((res) => res.json())
      .then((people) => {
        let allNamesArr = [];
        for (let person of people) {
          if (person.films.includes(base_url + select.value)) {
            allNamesArr.push(person.name);
          }
        }

        for (let liName of allNamesArr) {
          const li = document.createElement("li");
          li.innerText = liName;
          ol.append(li);
        }
      });
  });

  //event listener to display movie details based on changes made
  select.addEventListener("change", (event) => {
    event.preventDefault();
    fetch(base_url + "/")
      .then((res) => res.json())
      .then((data) => {
        const movieTitle = document.createElement("h3");
        const releaseYear = document.createElement("p");
        const description = document.createElement("p");

        display_info.innerHTML = "";
        ol.innerHTML = "";

        for (let d of data) {
          if (select.value === d.id) {
            movieTitle.innerText = d.title;
            releaseYear.textContent = d.release_date;
            description.textContent = d.description;
            display_info.append(movieTitle, releaseYear, description);
          }
        }
      })
      .catch((err) => console.log(err));
  });

  // event listener for reset button
  reset_button.addEventListener("click", (event) => {
    event.preventDefault();
    ul.innerHTML = "";
  });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
