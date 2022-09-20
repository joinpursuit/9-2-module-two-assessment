// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  const baseUrl = "https://ghibliapi.herokuapp.com/films";
  const urlPeople = "https://ghibliapi.herokuapp.com/people";
  const title = document.querySelector("#titles");
  const button = document.querySelector("#show-people");
  const form = document.querySelector("form");
  const ul = document.querySelector("ul");
  const ol = document.querySelector("ol");
  const reviewReset = document.querySelector("#reset-reviews");

  // event listener for people button, grabs people endpoint and loops thru list and adds an li for each person to ordered list.
  button.addEventListener("click", (e) => {
    e.preventDefault();
    ol.innerHTML = "";
    fetch(urlPeople)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (!title.value) {
          window.alert("Please select a movie first");
        } else {
          json.forEach((element) => {
            const personTag = document.createElement("li");
            personTag.textContent = element.name;
            ol.append(personTag);
          });
        }
      })
      .catch((err)=> console.log(err));
  });

  // adds movie titles to dropdown
  fetch(baseUrl)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      for (let films of json) {
        const option = document.createElement("option");
        option.setAttribute("value", films.id);
        option.textContent = films.title;
        title.append(option);
      }
      // adds movie reviews submit event listener and adds warning message without selecting a movie first.
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!title.value) {
          window.alert("Please select a movie first");
          // const userInput = e.target.review.value;
        } else {
          for (let films of json) {
            if (films.id === title.value) {
              const userInput = e.target.review.value;
              const li = document.createElement("li");
              li.innerHTML = `<strong>${films.title}:</strong> ${userInput}`;
              ul.append(li);
            }
          }
          form.reset();
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });

  //gets movie description based on drop down menu selection
  title.addEventListener("change", (e) => {
    e.preventDefault();

    fetch(baseUrl)
      .then((res) => res.json())
      .then((json) => {
        const displayInfoDiv = document.querySelector("#display-info");
        displayInfoDiv.innerHTML = "";
        for (let films of json) {
          if (films.id === title.value) {
            const h3 = document.createElement("h3");
            const ptagYear = document.createElement("p");
            const ptagDescription = document.createElement("p");
            h3.textContent = films.title;
            ptagYear.textContent = films.release_date;
            ptagDescription.textContent = films.description;
            displayInfoDiv.append(h3, ptagYear, ptagDescription);
          }
        }
      })
      .catch((err)=>console.log(err));
  });

  //reset the movie reviews
  reviewReset.addEventListener("click", (e) => {
    e.preventDefault();
    ul.innerHTML = "";
  });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
