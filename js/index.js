////////////////////////var S
const locDiv = document.querySelector(".loc-div");
const dateDiv = document.querySelector(".date-div");
const countryInp = document.querySelector(".country-inp");
const showBTN = document.querySelector(".shown-btn");
const stateDiv = document.querySelector(".state");
const degreeDiv = document.querySelector(".degree");
const windDiv = document.querySelector(".wind");
const infoDivs = document.querySelectorAll(".data");
const clearDivs = document.querySelectorAll(".clear");
////////////////////////var E

///////////////////////////////clear func S
function clearData() {
  clearDivs.forEach((div) => {
    div.innerHTML = ``;
  });
}
///////////////////////////////clear func E

////////////////////////////////////////shown action S
showBTN.addEventListener("click", () => {
  clearData();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${countryInp.value}&units=metric&appid=d6da9565c3289ea1726523981195f440`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod == 200) {
        ////////////////state S
        stateDiv.innerHTML = `<img src="resources/${data.weather[0].main}.png" width='30%'/>
        <h1>${data.weather[0].main}</h1>`;
        ////////////////state E

        degreeDiv.innerHTML = `<h1>${data.main.temp.toFixed(0)} °</h1>`;

        ///////////////////////addition info S
        windDiv.innerHTML = `<p>${data.wind.speed}</p>`;
        infoDivs.forEach((add) => {
          add.innerHTML = `<p>${data.main[add.id + ""]}</p>`;
        });
        ///////////////////////addition info S
        ////////////////////////////////////date and location action S
        fetch(
          `https://api.timezonedb.com/v2.1/get-time-zone?key=XOONTMDQ0CA7&format=json&by=position&lat=${data.coord.lat}&lng=${data.coord.lon}`
        )
          .then((res) => res.json())
          .then((secData) => {
            locDiv.innerHTML = `<h3>${secData.cityName}/${secData.countryName}</h3>`;
            dateDiv.innerHTML = `<h3>time : ${secData.formatted}</h3>`;
          });
        ////////////////////////////////////date and location action E
      } else if (data.cod == 404) {
        degreeDiv.innerHTML = `<h1 class="text-danger">${data.message} </h1>`;
      } else if (data.cod == 400) {
        degreeDiv.innerHTML = `<h1 class="text-danger">please enter country name to show info</h1>`;
      }
    });
});
////////////////////////////////////////shown action E
