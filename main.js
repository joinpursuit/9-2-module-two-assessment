// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  const base_url = "https://ghibliapi.herokuapp.com/films";
  const select = document.querySelector("#titles");
  const display_info = document.querySelector("#display-info");
//   const review_section = document.querySelector("section");
    const ul = document.querySelector("ul");
    const form = document.querySelector("form");
    const reset_button = document.querySelector("#reset-reviews")
    const people_button = document.querySelector("#show-people")

  fetch(base_url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      for (let d of data) {
        const option = document.createElement("option");
        option.setAttribute("value", d.id);
        // console.log(option.value);
        option.textContent = d.title;
        select.append(option);
      }
        
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (select.value === "") {
          alert("Please select a movie first");
        } else {
            
            for (let d of data) {
                if (d.id === select.value) {


                           const review_details = event.target.review.value
          console.log(review_details)

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


    select.addEventListener("change", (event) => {
        event.preventDefault();

    fetch(base_url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const movieTitle = document.createElement("h3");
        // console.log(movieTitle);

        const releaseYear = document.createElement("p");
        const description = document.createElement("p");

        display_info.innerHTML = "";

        for (let d of data) {
          if (select.value === d.id) {
            movieTitle.innerText = d.title;
            console.log(movieTitle);
            releaseYear.textContent = d.release_date;
            description.textContent = d.description;
            // console.log(description);
            display_info.append(movieTitle, releaseYear, description);
          }
        }

      });
  })
  .catch((err) => console.log(err));
    
    
    reset_button.addEventListener("click", event => {
    event.preventDefault()
ul.innerHTML = ""
})
    
}






// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
