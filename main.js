





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here

let apiFETCH = "https://ghibliapi.herokuapp.com/films/"

 fetch(apiFETCH)
.then((response) => response.json()).then((data) => {

    for(element of data){
        console.log(element)
let optionyay = document.createElement("option")
optionyay.setAttribute("value", `${element.id}`)
optionyay.textContent=`${element.title}`
document.querySelector("#titles-select").prepend(optionyay)

    }



})





.catch((error) => {
   
    console.log(error)
  }) 
}


// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
