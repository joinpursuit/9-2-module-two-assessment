
function run() {
 // Add code you want to run on page load here
 let filmName;
let selected;
fetch("https://ghibliapi.herokuapp.com/films")
  .then((response) => response.json())
  .then((films) => {
    

    for (let film of films) {
      const options = document.createElement("option");
      options.textContent = `${film.title}`;
      options.setAttribute("value", `${film.id}`);
      options.setAttribute("id", `${film.title}`);
      document.querySelector("#titles").append(options);
    }

    const selectElement = document.querySelector("#titles");
    selectElement.addEventListener("change", (event) => {
      selected = event.target.value;
      console.log(selected);
      document.querySelector("ol").innerHTML=""
      for (let film of films) {
        if (selected === film.id) {
          filmName = film.title;
          document.querySelector(
            "#display-info"
          ).innerHTML = `<h3>${film.title}</h3>
        <p>${film.release_date}</p>
        <p>${film.description}</p>
         `;
          let people = film.people;
          for (let person of people) {
            document
              .querySelector("#show-people")
              .addEventListener("click", (event) => {
                fetch(person)
                  .then((person) => person.json())
                  .then((person) => {
                   

                    const peopleLi = document.createElement("li");
                    peopleLi.textContent = person.name;
                    document.querySelector("ol").append(peopleLi);
                  });
              });
          }
        }
      }
    });

      document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        if (selected) {
            console.log(selectElement);
            console.log(selected);
            document.querySelector(
                "ul"
                ).innerHTML += `<li><strong>${filmName} Review</strong>:${event.target.review.value}</li>`;
            document.querySelector("#review").value = "";
        } else {
            document.querySelector("#review").value = event.target.review.value;
            window.alert("Please select a movie first");
        }
        
      });
    });
    const reset = document.querySelector("#reset-reviews");
    reset.addEventListener("click", (event) => {
      document.querySelector("ul").remove();
    });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
