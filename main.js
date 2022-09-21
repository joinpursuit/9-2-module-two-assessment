// const { default: fetch } = require("node-fetch");



// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 const baseUrl = "https://ghibliapi.herokuapp.com/films/"
const titleId = document.querySelector("#titles")
const form = document.querySelector("form")
const ol = document.querySelector("ol")
const ul = document.querySelector("ul")
const resetReview = document.querySelector("#reset-reviews")
const showPeopleButton = document.querySelector("#show-people")
 
fetch(baseUrl)
.then((resp) => resp.json())
.then((films) => {
    
//select menu
    for(let f of films){
        const optionElement = document.createElement("option")
        optionElement.setAttribute("value", `${f.id}`)
        
        optionElement.textContent = `${f.title}`
      
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
// this is to clear out people section after each "change" from selected movie 
ol.innerHTML = "";
    for(let d  of films){
        if(d.id === titleId.value) {
            const h3 = document.createElement("h3");
            const pYrTag = document.createElement("p");
            const descripPTag = document.createElement("p");
            h3.textContent = d.title;
          
            pYrTag.textContent = d.release_date;
           
            descripPTag.textContent = d.description;
            
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
    if(!titleId.value){
        alert("Please select a movie first")
    } else{
        for(let r of films) {
            if(r.id === titleId.value){
                const liElement = document.createElement("li")
                const reviewInput = e.target.review.value
                
               liElement.innerHTML =  `<strong>${r.title}:</strong> ${reviewInput}`;
                ul.append(liElement);
                form.reset(); // clears out the input in the add a review section after each submit.
            } 
            } 
    }
    
       
});
});

//reset button functionality 
resetReview.addEventListener("click", e => {
    e.preventDefault()
    ul.innerHTML = ""
});

//show people
showPeopleButton.addEventListener("click", (e) => {
    e.preventDefault();
const peopleId = "https://ghibliapi.herokuapp.com/people"
    fetch(peopleId)
    .then((resp) => resp.json())
    .then((pepData) => {
       
let people = [];

for(let p of pepData){
    if(p.films.includes(baseUrl + titleId.value)) {
        people.push(p.name)
       
    }
}

for(let ppl of people) {
    const liPepNames = document.createElement("li");
        liPepNames.innerHTML = ppl; // using innerHTML to populate people names in an ol 
        ol.append(liPepNames);
}
       
    });
});
   


}                                          
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
