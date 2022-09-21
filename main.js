// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
const url = "https://ghibliapi.herokuapp.com/films";

// const 
let p = document.createElement('p')

//fetch api 
function run() {
  fetch(url, {})
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })

    for(const d of data){
        document.createElement
    }

    .catch((error) => {
      console.log(error);
    });
  // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
