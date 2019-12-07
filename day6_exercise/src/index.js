const COUNTRY = "country";

const selectElement = document.querySelector("#js-select");
function getOption(event) {
  const option = `${event.target.value}`;
  console.log(option);
  saveCountry(option);
}

function saveCountry(country) {
  localStorage.setItem(COUNTRY, country);
}

function init() {
  const loadCountry = localStorage.getItem(COUNTRY);
  if (loadCountry === null) {
    // counytry is null
    // nothing to do
  } else {
    // country is
    const selectLength = selectElement.options.length;
    console.log(selectLength);
    for (var i = 0; i < selectLength; i++) {
      if (selectElement.options[i].value === loadCountry) {
        selectElement.options[i].selected = true;
      }
    }
  }
}

init();
selectElement.addEventListener("change", getOption);
