





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
let form = document.getElementById("form")
        let div = document.createElement("div");
form.after(div)
let oltag = document.querySelector("ol")

 // Add code you want to run on page load here
let titleIDARRAY =[]
let reviewtitleARR=[]

let peoplepopulationID = []
moviename = [] //this will push the film characters inside url
let apiFETCH = "https://ghibliapi.herokuapp.com/films/"

 let result = fetch(apiFETCH)
.then((response) => response.json()).then((data) => {

    for(element of data){
        // console.log(element)
let optionyay = document.createElement("option")
optionyay.setAttribute("value", `${element.id}`)
optionyay.setAttribute("id", `${element.id}`)
// console.log(element.id)
optionyay.textContent=`${element.title}`
document.querySelector("#titles-select").append(optionyay)
    }
// 

let titleselect = document.querySelector("#titles-select")
// for(let element of data){
// function titleSELECTOR(event){
//     event.preventDefault()
// let h3 = docddument.createElement("h3");
// h3.textContent = `${element.title}`
// let ptag1 = docuemnt.createElement("p")
// ptag1.textContent = `${element.release_date}`
// let ptag2 = document.createElement("p")
// ptag2.textContent=`${element.description}`
// let displayinfo = document.querySelector("#display-info")

// displayinfo.appendChild(h3, ptag1,ptag2 )
// }

// for(let element of data){

// }


    // for (eleemnt of data){

//     for (let i=0;i<data.length;i++){
// let movTITle = titleselect.options[i].text
// if(movTITle===this.value){
//     let h3 = document.createElement("h3");
//     h3.innerHTML = `${eleemnt.title}`
//     let ptag1 = document.createElement("p")
//     ptag1.textContent = `${eleemnt.release_date}`
//     let ptag2 = document.createElement("p")
//     ptag2.textContent=`${eleemnt.description}`
//     let displayinfo = document.querySelector("#display-info")
    
//     displayinfo.after(h3, ptag1,ptag2 )
// }
// }
// let movTITle = titleselect.options[i].text
let displayinfo = document.querySelector("#display-info")
let sectionC = document.querySelector("section.c")

let h3 = document.createElement("h3");
let ptag1 = document.createElement("p")
let ptag2 = document.createElement("p")



function rendertext(event){

    event.preventDefault();

    titleIDARRAY=[]
// console.log(displayinfo)

    // console.log(this.options.selectedIndex-1)
    for (element of data){
        titleIDARRAY.push(element)
        // peoplepopulationID.push(element.people)

    // titleIDARRAY[this.options.selectedIndex.id]
    }
    // titleIDARRAY[this.options.selectedIndex].title

// console.log(titleIDARRAY[this.options.selectedIndex-1].title)
// console.log(titleIDARRAY[this.options.selectedIndex-1])
// console.log(event.target)
reviewtitleARR.push(titleIDARRAY[this.options.selectedIndex-1].title)
// reviewtitleARR.push(event.target.value)
// console.log(titleIDARRAY)
    // let h3 = document.createElement("h3");
h3.textContent=""
ptag1.textContent=""
ptag2.textContent=""
oltag.textContent=""
    h3.textContent = `${titleIDARRAY[this.options.selectedIndex-1].title
    }`
    // let ptag1 = document.createElement("p")
    ptag1.textContent = `${titleIDARRAY[this.options.selectedIndex-1].release_date}`
    // let ptag2 = document.createElement("p")
    ptag2.textContent=`${titleIDARRAY[this.options.selectedIndex-1].description}`
    document.getElementById("display-info").appendChild(h3)
    document.getElementById("display-info").appendChild(ptag1)
    document.getElementById("display-info").appendChild(ptag2)
    // console.log(reviewtitleARR)
    // peoplepopulationID=[]
    peoplepopulationID.push(titleIDARRAY[this.options.selectedIndex-1].people)
    moviename.push(titleIDARRAY[this.options.selectedIndex-1].people)
            // peoplepopulationID.push(titleIDARRAY[this.options.selectedIndex-1].people)
        
            // console.log(peoplepopulationID)

// console.log(peoplepopulationID)

}



titleselect.addEventListener("change",  rendertext)

        

let reviewinnertext = document.getElementById("review")

function reviews(event){
 event.preventDefault()
 let dropdown = document.getElementById("titles-select")
if(dropdown.selectedIndex===0){
div.innerText = "Please select a movie first"
document.getElementById("form").reset()

}
else{
    div.innerText = ""
let ul = document.querySelector("ul")
ul.innerHTML += `<li><strong>${reviewtitleARR[reviewtitleARR.length-1]}:</strong> ${reviewinnertext.value}</li>`
document.getElementById("form").reset()

}
// let ul = document.querySelector("ul")
// let reviewv = document.querySelector("#review")
// let reviewvalue = reviewv.value
   
// let li = document.createElement("li");
// let thereview = `<li><strong>${reviewtitleARR[reviewtitleARR.length-1]}</strong>:${reviewvalue}</li>`
// ul.innerHTML=thereview;
// console.log()
// }
}


let formrev = document.getElementById("form")
let button = document.getElementById("button")
formrev.addEventListener("submit",reviews)

// div.textContent = ""



function deleteallreviews(event){
    event.preventDefault()
    let ul2 = document.querySelector("ul")
ul2.textContent =""
}

let resetreviews = document.querySelector("#reset-reviews")
resetreviews.addEventListener("click",deleteallreviews)

})
// let oltag = document.querySelector("ol")
    // let peoplepop = titleIDARRAY[titleIDARRAY.length-1]

    // console.log(titleselectionFUNC())
function peopleGENERATOR(event) {
event.preventDefault()
// oltag.innerHTML=""
// div.textContent = ""

// console.log(peoplepopulationID)
// let peeps77 = peoplepopulationID[peoplepopulationID.length-1];
// for (let i =0;i<peeps77.length;i++){
    // for(let z=0;z<peeps77.length;z++)
    // let peopleid = 
    // let fetch ="https://ghibliapi.herokuapp.com/people/"
fetch("https://ghibliapi.herokuapp.com/people/").then((response3) => response3.json()).then((data3) => {

for (element of data3){
    for(elem of moviename[moviename.length-1]){
if(element.url===(elem)){
oltag.innerHTML+=`<li>${element.name}</li>`
}}}

    // for(let i=0;i<data3.length;i++){
    
// }
}).catch((error) => {
    // oltag.innerHTML="select a movie"

    console.log(error)
  }) 
}
let peoplebutton = document.getElementById("show-people")

peoplebutton.addEventListener("click",peopleGENERATOR)

    





result.catch((error) => {
    

    console.log(error)
  }) 
  
}


// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
