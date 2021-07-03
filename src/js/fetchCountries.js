const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountry(country) {
  return fetch(`${BASE_URL}/name/${country}`).then(response => {
    return response.json();
  });
}
export default { fetchCountry };
