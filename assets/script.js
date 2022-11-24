const searchInputElm = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

let formSubmitHandler = function (event) {
  event.preventDefault();
  let searchInput = searchInputElm.value.trim();
  console.log(searchInputElm);

  if (searchInput) {
    getApi(searchInput);
  }
  console.log(searchInput);
};

function getApi(searchInput) {
  const apiKey = 'ccdda50f842db20aa95ba4fdf68c962d';
  let apiUrl =
    'https://api.themoviedb.org/3/search/movie?api_key=' +
    apiKey +
    '&language=en-US&query=' +
    searchInput +
    '&page=1&include_adult=false';

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
    });
}
// console.log(apiUrl);

searchButton.addEventListener('click', function (event) {
  formSubmitHandler(event);
  // clearInput();
});
