// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    const API_URL = (endpoint) => `https://ghibliapi.herokuapp.com/${endpoint}`;
    const FILMS_ENDPOINT = 'films';
    const PEOPLE_ENDPOINT = 'people';
  
    const renderFilmOptions = (films) => {
      const filmsSelectorElement = document.querySelector('#titles');
      
      films.forEach(film => {
        const filmTitle = film.title
        const filmId = film.id
        ////////////////////////
        // const filmSelectorValue = filmsSelectorElement.value
        // const filmReleaseYear = film.release_date
        // const filmDescription = film.description
  
        const optionElement = document.createElement("option") // <option></option>
        optionElement.value = filmId //****?*/ <option value="filmId"></option>
        const optionHTML = filmTitle
  
        optionElement.innerHTML = optionHTML
        filmsSelectorElement.appendChild(optionElement)
     })}

    const renderFilmDetails = (film) => {
      const displayInfoSelector= document.querySelector('#display-info')
      displayInfoSelector.innerHTML = ""
        
        const { release_date, description, title } = film

        const displayInfoHTML =
          `
            <h3> ${title} </h3>
            <p> ${release_date} </p>
            <p> ${description} </p>
          `

        displayInfoSelector.innerHTML = displayInfoHTML
    }
  
    fetch(API_URL(FILMS_ENDPOINT))
      .then(filmsResponse => filmsResponse.json())
      .then(filmsData => {
        fetch(API_URL(PEOPLE_ENDPOINT))
          .then(peopleResponse => peopleResponse.json())
          .then(peopleData => {
            let selectedFilm = {}
            const filmsSelectorElement = document.querySelector('#titles');
            const peopleListElement = document.querySelector(".ol-list")
            const showPeopleButton = document.querySelector('#show-people')

            showPeopleButton.addEventListener('click', () => {
              const peopleBelongsToFilm = peopleData.filter(person => person.films.includes(`${API_URL(FILMS_ENDPOINT)}/${selectedFilm.id}`))
              peopleBelongsToFilm.forEach(person => {
                const liElement = document.createElement('li') 
                const liHTML = person.name
  
                liElement.innerHTML = liHTML
  
                peopleListElement.appendChild(liElement)
              })
            })

            renderFilmOptions(filmsData)
              filmsSelectorElement.addEventListener('change', () => {
                peopleListElement.innerHTML = ""
                selectedFilm = filmsData.find(film => film.id === filmsSelectorElement.value)

                renderFilmDetails(selectedFilm)
              })
    
            const listReviewsElement  = document.querySelector('.list-reviews')
            const formSubmitElement  = document.querySelector('.form-submit')
    
            formSubmitElement.addEventListener('submit', event => {
              event.preventDefault()
    
              if (!selectedFilm) {
                return
              }
    
              const reviewInput = document.querySelector('#review')
              const reviewValue = reviewInput.value
              
              const liElement = document.createElement('li')
              const liHTML = `<strong>${selectedFilm.title}: ${reviewValue}</strong>`
    
              liElement.innerHTML = liHTML
    
              listReviewsElement.appendChild(liElement)
    
              reviewInput.value = ""
            })
          })
        })
  }

// Steps:
// 1.Looking for the Reference -yes
// 2.Segment all the data (of all the movie titles) needed from the API. yes
 /////2.1 (using -for each- array method) yes
// 3.create the DOM of elements options as movie titles has the data.yes
//4.append child to #titles reference (filmsSelectorElement)


// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
