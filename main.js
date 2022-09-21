// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  fetch("https://ghibliapi.herokuapp.com/films")
    .then((response) => response.json())
    .then((data) => {
      const select = document.querySelector("#titles");
      const details = document.querySelector("#display-info");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");
      const p2 = document.createElement("p");
      const reset = document.querySelector("#reset-reviews");
      const ul = document.querySelector("ul");
      const ol = document.querySelector("ol");
      const people = document.querySelector("#show-people");

      // console.log(data);

      for (let movie of data) {
        const option = document.createElement("option");
        option.setAttribute("value", movie.id);
        option.innerText = movie.title;
        select.append(option);
      }

      select.addEventListener("change", (event) => {
        event.preventDefault();

        data.forEach((el) => {
          details.innerHTML = "";
          if (el.id === event.target.value) {
            h3.textContent = el.title;
            p.textContent = el.release_date;
            p2.textContent = el.description;
          }
        });

        details.append(h3, p, p2);
      });

      const form = document.querySelector("form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (select.value === "") {
          alert("Please select a movie first");
        } else {
          const ul = document.querySelector("ul");
          const li = document.createElement("li");
          li.innerHTML = `<strong>${h3.textContent}:</strong> ${review.value}`;
          ul.append(li);
          review.value = "";
        }
      });

      reset.addEventListener("click", (event) => {
        ul.innerHTML = "";
      });
      people.addEventListener("click", (event) => {
        event.preventDefault();
        ol.innerHTML = "";
      fetch("https://ghibliapi.herokuapp.com/people")
        .then((response) => response.json())
        .then((json) => {
          
           
           
            for (let person of json) {
              if (person.films[0].includes(select.value)) {
                ol.innerHTML += `<li>${person.name}</li>`;
              }
            }
          });
        });
    });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
