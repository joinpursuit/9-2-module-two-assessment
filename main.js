





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
let titleIDARRAY =[]
let apiFETCH = "https://ghibliapi.herokuapp.com/films/"

 fetch(apiFETCH)
.then((response) => response.json()).then((data) => {

    for(element of data){
        console.log(element)
let optionyay = document.createElement("option")
optionyay.setAttribute("value", `${element.id}`)
optionyay.setAttribute("id", `${element.id}`)
console.log(element.id)
optionyay.textContent=`${element.title}`
document.querySelector("#titles-select").append(optionyay)
    }
// 

let titleselect = document.querySelector("#titles-select")
// for(let element of data){
// function titleSELECTOR(event){
//     event.preventDefault()
// let h3 = document.createElement("h3");
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
console.log(displayinfo)

    console.log(this.options.selectedIndex-1)
    for (element of data){
        titleIDARRAY.push(element)
    // titleIDARRAY[this.options.selectedIndex.id]
    }
    // titleIDARRAY[this.options.selectedIndex].title

console.log(titleIDARRAY[this.options.selectedIndex-1].title)
    // let h3 = document.createElement("h3");
h3.textContent=""
ptag1.textContent=""
ptag2.textContent=""
    h3.textContent = `${titleIDARRAY[this.options.selectedIndex-1].title
    }`
    // let ptag1 = document.createElement("p")
    ptag1.textContent = `${titleIDARRAY[this.options.selectedIndex-1].release_date}`
    // let ptag2 = document.createElement("p")
    ptag2.textContent=`${titleIDARRAY[this.options.selectedIndex-1].description}`
    sectionC.append(h3,ptag1,ptag2)
}



titleselect.addEventListener("change",  rendertext)

        

















}).catch((error) => {
   
    console.log(error)
  }) 

}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
