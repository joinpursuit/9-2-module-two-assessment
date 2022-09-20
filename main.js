// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  const baseAPI = "https://ghibliapi.herokuapp.com/films";
  const movieTitle = document.querySelector("#titles");
  const button = document.createElement("button");
  button.setAttribute("id", "show-people");
  button.textContent = "show-people";
  const form = document.querySelector("form");
  const ul = document.querySelector("ul");
  const reset = document.querySelector("#reset-reviews");

  fetch(baseAPI)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      for (let d of json) {
        const option = document.createElement("option");
        option.setAttribute("value", d.id);
        option.textContent = d.title;
        movieTitle.append(option);
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!movieTitle.value) {
          window.alert("Please select a movie first");
        }
        for (let films of json) {
          if (films.id === movieTitle.value) {
            const userInput = e.target.review.value;
            console.log(userInput);
            const li = document.createElement("li");
            li.innerHTML = `<strong>${films.title}:</strong> ${userInput}`;
            ul.append(li);
          }
        }
        form.reset();
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // Getting Movie description
  movieTitle.addEventListener("change", (e) => {
    e.preventDefault();
    fetch(baseAPI)
      .then((response) => response.json())
      .then((json) => {
        const infoDiv = document.querySelector("#display-info");
        infoDiv.innerHTML = "";

        for (let f of json) {
          if (f.id === movieTitle.value) {
            const h3 = document.createElement("h3");
            const pYear = document.createElement("p");
            const pDescription = document.createElement("p");
            h3.textContent = f.title;
            pYear.textContent = f.release_date;
            pDescription.textContent = f.description;
            infoDiv.append(h3, pYear, pDescription);
            console.log(h3);
          }
        }
      });
    });
    
    reset.addEventListener("click", (e) => {
      e.preventDefault();
      ul.innerHTML = "";
    });
}

// Add code you want to run on page load here

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
