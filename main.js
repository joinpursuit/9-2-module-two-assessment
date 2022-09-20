// const { default: fetch } = require("node-fetch");



// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 const baseUrl = "https://ghibliapi.herokuapp.com/films"
const titleId = document.querySelector("#titles")
const form = document.querySelector("form")
const ul = document.querySelector("ul")
const resetReview = document.querySelector("#reset-reviews")
 
fetch(baseUrl)
.then((resp) => resp.json())
.then((films) => {
    console.log(films)
//select menu
    for(let f of films){
        const optionElement = document.createElement("option")
        optionElement.setAttribute("value", `${f.id}`)
        // console.log(optionElement.value)
        optionElement.textContent = `${f.title}`
        // console.log(f.title)
        titleId.append(optionElement)

    }

})
.catch((error) => console.log(error));

// movie description
titleId.addEventListener("change", (e) => {
    e.preventDefault();

    fetch(baseUrl)
    .then((resp) => resp.json())
    .then((films) =>{

const div = document.querySelector("#display-info");
div.innerHTML = "";

    for(let d  of films){
        if(d.id === titleId.value) {
            const h3 = document.createElement("h3");
            const pYrTag = document.createElement("p");
            const descripPTag = document.createElement("p");
            h3.textContent = d.title;
            // console.log(d.title)
            pYrTag.textContent = d.release_date;
            // console.log(d.release_date)
            descripPTag.textContent = d.description;
            // console.log(d.description)
            div.append(h3);
            div.append(pYrTag);
            div.append(descripPTag)
        }
    }
    
 });
});

// Review

form.addEventListener("submit", (e) => {
e.preventDefault();


fetch(baseUrl)
.then((resp) => resp.json())
.then((films) => {
    for(let r of films) {
        if(r.id === titleId.value){
            const liElement = document.createElement("li")
            const review_details = e.target.review.value
           liElement.innerHTML = `<strong>${r.title}</strong> ${review_details}`;
            ul.append(liElement);
        } else {
            alert("Please select a movie first")
        }
       form.reset();
        } 

});
});



}                                          
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
