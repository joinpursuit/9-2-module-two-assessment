





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 const BASE_URL = "https://ghibliapi.herokuapp.com/";

 fetch(`${BASE_URL}films`)
   .then((res) => res.json())
   .then((res) => {
     console.log(res);

     const titles = document.querySelector("#titles");

     for (let i = 0; i < res.length; i++) {
       const option = document.createElement("option");
       const { id, title, description, release_date } = res[i];
       option.value = id;
       option.textContent = title;
       titles.append(option);

       titles.addEventListener("change", (e) => {
         e.preventDefault();

         if (titles.value === id) {
           const movieInfo = document.querySelector("#display-info");
           movieInfo.innerHTML = "";

           const h3 = document.createElement("h3");
           h3.textContent = `${title}`;

           const releasedDate = document.createElement("p");
           releasedDate.textContent = `${release_date}`;

           const movieDescription = document.createElement("p");
           movieDescription.textContent = `${description}`;

           movieInfo.append(h3, releasedDate, movieDescription);
         }
       });
     }

     const form = document.querySelector("form");

     const userReview = document.querySelector("#review");
     form.addEventListener("submit", (event) => {
       event.preventDefault();

       console.log(event);
       if (titles.value === "") {
         alert("Please select a movie first");
       } else {
         let film = res.find((film) => {
           return film.id === titles.value;
         });

         const ul = document.querySelector("ul");
         const li = document.createElement("li");
         li.textContent = "";
         li.innerHTML = `<strong>${film.title}:</strong> ${userReview.value}`;
         ul.append(li);
         form.reset();
       }
     });

     const resetReview = document.querySelector("#reset-reviews");
     const ul = document.querySelector("ul");
     resetReview.addEventListener("click", () => {
       ul.innerHTML = "";
     });

     const button = document.querySelector("#show-people");

     button.addEventListener("click", (e) => {
       e.preventDefault();
       const ol = document.querySelector("ol");
       ol.textContent = "";
       fetch(`${BASE_URL}people`)
         .then((res) => res.json())
         .then((people) => {
           let filmId = titles.value;
           for (let person of people) {
             for (let movie of person.films) {
               if (movie.includes(filmId)) {
                 const li = document.createElement("li");
                 li.textContent = `${person.name}`;
                 ol.append(li);
               }
             }
           }
         })
         .catch((err) => console.log(err));
     });
   })
   .catch((err) => console.log(err));
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
