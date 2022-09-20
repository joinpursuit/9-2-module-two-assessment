function run() {
  // Add code you want to run on page load here
  const select = document.querySelector("select");
  const collection = [];

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
          people: movie.people.map((person) =>
            person.replace("https://ghibliapi.herokuapp.com/people/", "")
          ),
        });
      });
    })
    .catch((error) => {
      // You can do what you like with the error here.
      console.log(error);
    });

  let tmp = "";
  function modifyText() {
    if (!!select.options[select.selectedIndex].innerText) {
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
    let ol = document.createElement("ol");
    people.after(ol);
    fetch("https://ghibliapi.herokuapp.com/people/")
      .then((response) => response.json())
      .then((json) => {
        json.forEach((person) => {
          if (tmp[0].people.includes(person.id)) {
            let li = document.createElement("li");
            li.innerText = person.name;
            ol.append(li);
          }
        });
      });
  });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
