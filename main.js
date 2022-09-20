





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {

const movies = "https://ghibliapi.herokuapp.com";

fetch(movies)
    .then(response => response.json())
    .then(renderMoviesWithCreate)
 
function renderMoviesWithInnerHtml(json) {
    const main = document.querySelector("main");
    main.innerHTML = "";
    json.forEach(movies => {
        const div = `<div class="movies">
        <a href="${movies.website_url || "#"}">
                <h2>${movies.name}</h2>;
            <a/>
        </div>`;
        main.innerHTML += div;
    })
}

function renderMoviesWithCreate(json) {
    const main = document.querySelector("main");
    main.innerHTML = "";

    json.forEach(movies => {
        const div = document.createElement("div");
        div.classList.add("movies");

        const a = document.createElement("a");
        a.setAttribute("href", movies.website_url || "#");

        const h2 = document.createElement("h2");
        h2.textContent = movies.name;

        const p = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");

        div.prepend(a, p, p2, p3);
        a.prepend(h2);

        p.textContent = movies.name;
        

        main.append(div);
    })
}

 // Add code you want to run on page load here

}
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

// setTimeout(run, 1000);

