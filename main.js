// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 const url = "https://ghibliapi.herokuapp.com/Films"

 const section = document.querySelector("#titles")
 const h3 = document.querySelector(".name")
 const p1 = document.querySelector(".date")
 const p2 = document.querySelector(".description")


 const select = document.querySelector("select")
 const reviews = document.querySelector("#reviews")
 const form = document.querySelector("form")
 const reviewInput = document.querySelector("form input#review")
 const reviewUL = document.querySelector("section#reviews ul")
 const reset = document.querySelector("#reset-reviews")
 const showPeople = document.querySelector("#show-people")
 const personList = document.querySelector("#person-list")

 let foundMovie

//  When a movie is selected
 select.addEventListener('change', e => {
    fetch(url)
    .then(res => res.json())
    .then(data => {

       const foundObject = data.find(movie => movie.id === e.target.value)

       foundMovie = foundObject

       const {title, release_date, description} = foundObject

        h3.innerText = title
        p1.innerText = release_date
        p2.innerText = description

       console.log('value', e.target.value)
    //    console.log('foundMovie', foundMovie)
    })
})


// Add reviews to ul
form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(url)
    .then(res => res.json())
    .then(data => {

    const movieTitle = data.find(movie => movie.title === foundMovie.title).title

    const li = document.createElement('li')

    li.innerHTML = `
    <strong><b>${movieTitle}</b></strong>: ${reviewInput.value}
    ` 
    reviewUL.append(li)

    form.reset()

       console.log('value', movieTitle)
       console.log('data', movieTitle)
    })
    .catch((error) => console.log(error))
})

// Reset Reviews
reset.addEventListener('click', e => {
    reviewUL.innerHTML = ''
})


showPeople.addEventListener("click", (event) => {
    fetch("https://ghibliapi.herokuapp.com/people")
      .then((event) => {
        return event.json();
      })
      .then((event) => {
        for (let person of event) {
          for (let film of person.films) {
            if (film.includes(section.value)) {
              const personName = document.createElement("li");
              personName.innerText = person.name;
              personList.append(personName);
            }
          }
        }
      });
  });





// Fetch all movies and render title for options
 fetch(url)
 .then((res) => res.json())
 .then((resJson) => {
     for(let i = 0; i < resJson.length; i++){
         const filmTitle = resJson[i].title
         const option = document.createElement("option")
         option.innerHTML = filmTitle
         option.value = resJson[i].id
         section.append(option)
         option.textContent = filmTitle
     }
 })
 .catch((error) => console.log(error))
}


// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
