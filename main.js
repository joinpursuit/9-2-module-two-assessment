





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 
 
    // Add code you want to run on page load here

    
    const dropdown = document.querySelector("select");
    const titles = document.getElementById("titles")
    const ol = document.querySelector("ol");
    const ul = document.querySelector("ul");
    const addReview = document.getElementById("review")
    const movieDetails = document.getElementById("display-info")
    const btnPeople = document.getElementById("show-people");
    const reset = document.getElementById("reset-reviews")
    const formReview = document.querySelector("form");
    // const resetUl = document.querySelector("#review ul")
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const p2 = document.createElement("p");
    let people = document.createElement("li");
    
    

    // const arrayOfMovies = []
    // Select a movie
    const url = "https://ghibliapi.herokuapp.com/films"
    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        console.log(json)
        for(let x of json) {
            const titleOption = document.createElement("option");
            titleOption.setAttribute("value", x.id);
            // console.log(option.value)
            titleOption.innerHTML = x.title;
            titles.append(titleOption);
        }
    })
    .catch((err) => {
        console.log(err)
    })
    
    
    // Movie details
    titles.addEventListener("change", event => {
        event.preventDefault();
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            movieDetails.textContent = "";

            for(let x of json) {
                if(x.id === titles.value) {
                    h3.textContent = x.title;
                    p.textContent = x.release_date;
                    p2.textContent = x.description;
                    movieDetails.append(h3);
                    movieDetails.append(p);
                    movieDetails.append(p2);
                }
            }
        });
    });

    // Add a review
    formReview.addEventListener("submit", event => {
        event.preventDefault();
        
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            if (!titles.value) {
                alert("Please select a movie first");
        } else {
             for(let y of json) {
                if(y.id === titles.value) {
                const review = event.target.review.value;
                const li = document.createElement("li");
                li.innerHTML = `<strong>${y.title}:</strong> ${addReview}`;
                ul.append(li);
                formReview.reset();
                    };
                };
            };
        });
    });  

    // Reset button
    reset.addEventListener("click", event => {
        event.preventDefault();
        ul.innerHTML = "";
    });
    
    // Get people
    btnPeople.addEventListener("click", event => {
        event.preventDefault();
       
        fetch("https://ghibliapi.herokuapp.com/people")
            .then((response) => response.json())
            .then ((json) => {
            
                let person = [];
                json.forEach((names) => {
                    people.innerHTML = names.name;
                    ol.append(people);
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }) 

    


}
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
