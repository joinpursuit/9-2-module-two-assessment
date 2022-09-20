// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  const select = document.querySelector("select");
  const collection = [];
  let currentMovie = select.options[select.selectedIndex].innerText;

  fetch("https://ghibliapi.herokuapp.com/films/")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      json.forEach((movie) => {
        let newOpt = document.createElement("option");
        newOpt.value = `${movie.id}`;
        newOpt.textContent = `${movie.title}`;
        let option = select.lastElementChild;
        option.after(newOpt);
        collection.push({
          title: movie.title,
          id: movie.id,
          year: movie.release_date,
          desc: movie.description,
          people: movie.people,
        });
      });
    })

    .catch((error) => {
      // You can do what you like with the error here.
      console.log(error);
    });
  let tmp = "";
  // Function to change the content of t2
  function modifyText() {
    if (select.options[select.selectedIndex].innerText === "") {
      ("");
    } else {
      tmp = collection.filter(
        (movie) =>
          movie.title === select.options[select.selectedIndex].innerText
      );
      document.getElementById(
        "display-info"
      ).innerHTML = `<h3>${tmp[0].title}</h3> <p>${tmp[0].year}
    </p><p>${tmp[0].desc}</p>`;
    }
  }

  // An `h3` with the movie's title appear in the display-info section of the page.
  // A `p` with the movie's release year.
  // A `p` with the description of the movie.

  // Add event listener to table
  const el = document.querySelector("select");
  el.addEventListener("input", modifyText, false);
  const review = document.querySelector("input[type=submit]");
  const reset = document.querySelector("button");
  const people = document.querySelector("#show-people");

  review.addEventListener("click", (event) => {
    event.preventDefault();
    if (select.options[select.selectedIndex].innerText === "") {
      alert("Please select a movie first");
    } else {
      let li = document.createElement("li");
      li.innerHTML = `<strong>${
        select.options[select.selectedIndex].innerText
      }:</strong> ${document.querySelector("input[type=text]").value}`;
      document.querySelector("ul").append(li);
      document.querySelector("form").reset();
    }
  });

  reset.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("ul").innerHTML = "";
  });

  people.addEventListener("click", (event) => {
    event.preventDefault();
    // console.log(tmp[0].people.length);
    // console.log(tmp[0].people);
    if (tmp[0].people.length <= 1) {
      fetch("https://ghibliapi.herokuapp.com/people/")
        .then((response) => response.json())
        .then((json) => {
          let ol = document.createElement("ol");
          people.after(ol);

          json.forEach((person) => {
            let li = document.createElement("li");
            li.innerText = person.name;
            ol.append(li);
          });
        });
    } else {
      Promise.all(
        tmp[0].people.map((url) => {
          return fetch(`${url}`).then((response) => response.json());
        })
      ).then((reponse) => {
        let ol = document.createElement("ol");
        people.after(ol);
        reponse.forEach((person) => {
          let li = document.createElement("li");
          li.innerText = person.name;
          ol.append(li);
        });
      });
    }
  });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
