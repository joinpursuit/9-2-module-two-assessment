// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  const base_url = "https://ghibliapi.herokuapp.com/films";
  const select = document.querySelector("#titles");

  fetch(base_url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      for (let d of data) {
        const option = document.createElement("option");
        option.setAttribute("value", d.id);
        console.log(option.value);
        option.textContent = d.title;
        select.append(option);
      }
    })
    .catch((err) => console.log(err));
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
