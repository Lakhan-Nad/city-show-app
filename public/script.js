function cityObj(name, date, desc, url) {
  this.name = name;
  this.desc = desc;
  this.date = date;
  this.imgLink = url;
}

let cities = new Array();

function addCity(name, desc, date, url) {
  let city = new cityObj(name, desc, date, url);
  cities.push(city);
  appendLast();
}

function displayAll() {
  let content = document.getElementById("content");
  content.innerHTML = "";
  for (let city of cities) {
    let data = `
            <div class='container'>
            <div class='flipper'>
            <div class='front'>
            <img src='${city.imgLink}' alt='${city.name}'>
            <p class='caption'>${city.name}</p>
            </div>
            <div class='back'>
            <h1>${city.name}</h1>
            </a>
            <p class='date'>${city.date}</p>
            <p class='description'>${city.desc}</p>
            </div>
            </div>
            </div>
        `;
    content.innerHTML += data;
  }
}

function appendLast() {
  let content = document.getElementById("content");
  let city = cities[cities.length - 1];
  let data = `
            <div class='container'>
            <div class='flipper'>
            <div class='front'>
            <img src='${city.imgLink}' alt='${city.name}'>
            <p class='caption'>${city.name}</p>
            </div>
            <div class='back'>
            <h1>${city.name}</h1>
            </a>
            <p class='date'>${city.date}</p>
            <p class='description'>${city.desc}</p>
            </div>
            </div>
            </div>
        `;
  content.innerHTML += data;
}

function formSubmit() {
  let form = document.forms[0];
  let name = form.elements[0].value.trim();
  let date = form.elements[1].value.trim();
  let desc = form.elements[2].value.trim();
  let url = form.elements[3].value.trim();
  addCity(name, date, desc, url);
  form.reset();
}

function suggestion(id, city, address) {
  return `<div class="sug" onclick="takeSug(${id})"><div class="pname">${city}</div><div class="paddress">${address}</div></div>`;
}

const service = new google.maps.places.PlacesService(
  document.createElement("div")
);

const Data = [];

function makeReq(city) {
  const request = {
    query: city,
    fields: ["name", "formatted_address", "photos"],
  };
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      while (Data.length > 0) {
        Data.pop();
      }
      let sgel = document.getElementById("suggestions");
      results.forEach((element) => {
        Data.push(element);
      });
      Data.forEach((el, index) => {
        sgel.innerHTML += suggestion(index, el.name, el.formatted_address);
      });
    }
  });
}

document.getElementById("form-name").addEventListener("input", function () {
  let val = document.getElementById("form-name").value;
  let el = document.getElementById("suggestions");
  el.innerHTML = "";
  makeReq(val);
});

function takeSug(id) {
  document.getElementById("form-name").value = Data[id].name;
  if (Data[id].photos) {
    document.getElementById("form-url").value = Data[id].photos[0].getUrl();
  } else {
    document.getElementById("form-url").value =
      "https://img.freepik.com/free-vector/silhouette-skyline-illustration_53876-78786.jpg?size=626&ext=jpg";
  }
  document.getElementById("suggestions").innerHTML = "";
}
