// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  const baseUrl = "https://ghibliapi.herokuapp.com/films";
  const title = document.querySelector("#titles");
  const button = document.createElement("button");
  button.setAttribute("id", "show-people");
  button.textContent = "Show People";
  const form = document.querySelector('form');
  const ul = document.querySelector('ul');
  const reviewReset = document.querySelector('#reset-reviews');

  fetch(baseUrl)
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
      for (let films of json) {
        const option = document.createElement("option");
        option.setAttribute("value", films.id);
        option.textContent = films.title;
        title.append(option);
      }

      form.addEventListener('submit', (e)=> {
        e.preventDefault();
        if (!title.value) {
            window.alert('Please select a movie first')
        }  
        for (let films of json) {
            if (films.id === title.value) {
                const userInput = e.target.review.value;
                const li = document.createElement('li');
                li.innerHTML = `<strong>${films.title}:</strong> ${userInput}`;
                ul.append(li);
            }
        }
        form.reset();
      })
    })
    .catch((err) => {
      console.log(err);
    });
    

//gets movie description
  title.addEventListener("change", (e) => {
    e.preventDefault();
    fetch(baseUrl)
      .then((res) => res.json())
      .then((json) => {
        const displayInfoDiv = document.querySelector('#display-info')
        displayInfoDiv.innerHTML = '';
    for (let films of json) {
      if (films.id === title.value) {
        const h3 = document.createElement("h3");
        const ptagYear = document.createElement("p");
        const ptagDescription = document.createElement("p");
        h3.textContent = films.title;
        ptagYear.textContent = films.release_date;
        ptagDescription.textContent = films.description;
        displayInfoDiv.append(h3,ptagYear,ptagDescription);
      }
    }
      });
  });

reviewReset.addEventListener('click',(e)=> {
    e.preventDefault();
    ul.innerHTML = '';
});
   




//     for (let films of json) {
//     if (films.id === movieTitle.value) {
//     const strongTag = document.createElement('strong'); 
//     strongTag.innerText = `${films.title}:`
//     li.append(strongTag);
//     console.log(li); 
//     console.log(userInput)
//     li.textContent= userInput;
//     console.log(li); 
//     const ul = document.querySelector('ul');
//     ul.append(li);
//     console.log(li); 
//         }
//     }
    
// }) 

}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
