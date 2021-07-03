import './sass/main.scss';
import debounce from 'lodash.debounce';
import API from './js/fetchCountries';
import countryList from './templates/countriesList.hbs';
import countryCard from './templates/countriesMarckup.hbs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const cardContainer = document.querySelector('.card-container');
const searchForm = document.querySelector('#clearme');

searchForm.addEventListener('input', debounce(countrySearch, 500));

function countrySearch(e) {
  e.preventDefault();

  const form = e.target;
  const searchQuery = form.value;

  API.fetchCountry(searchQuery)
    .then(renderCard)
    .catch(onFetchError)
    .finally(() => form.reset);
}

function onFetchError() {
  error({
    text: 'Too many matches found. Please enter a more spesific query!',
    delay: '2000',
    maxTextHeight: null,
  });
}

function renderCard(country) {
  const pageNotFound = country.status === 404;

  if (pageNotFound) {
    cardContainer.innerHTML = '';
    onFetchError();
    return;
  }

  if (country.length > 10) {
    cardContainer.innerHTML = '';
    onFetchError();
    return;
  }

  if (country.length >= 2 && country.length <= 10) {
    const markupList = countryList(country);
    cardContainer.innerHTML = markupList;
    return;
  }

  const markupCard = countryCard(country);
  cardContainer.innerHTML = markupCard;
}
