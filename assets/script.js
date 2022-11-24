const searchInputElm = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

let formSubmitHandler = function (event) {
  event.preventDefault();
  let searchInput = searchInputElm.value.trim();
  // console.log(searchInputElm);

  if (searchInput) {
    movieSearch(searchInput);

    searchInputElm.value = '';
  } else {
    searchInputElm.textContent = '';
    alert('Please enter a movie name for your search!');
  }
  // console.log(searchInput);
};

function movieSearch(movie) {
  let userSearch = movie || searchInputElm.value;

  const apiKey = 'ccdda50f842db20aa95ba4fdf68c962d';
  let apiUrl =
    'https://api.themoviedb.org/3/search/movie?api_key=' +
    apiKey +
    '&language=en-US&query=' +
    userSearch +
    '&page=1&include_adult=false';

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      // console.log(response);

      document.querySelector('#list-container').innerHTML = '';

      let movieTitle = response.results[0].title;
      let movieYear = response.results[0].release_date;
      let movieOverview = response.results[0].overview;

      // Movie Poster
      let moviePosterPath = response.results[0].poster_path;
      // console.log(moviePosterPath);

      let listContainer = document.querySelector('#list-container');
      listContainer.setAttribute('class', 'ml-4');

      let infoCard = document.createElement('ul');
      infoCard.setAttribute(
        'class',
        'w-full flex flex-col justify-start gap-[3rem]'
      );

      let infoTitle = document.createElement('li');
      infoTitle.setAttribute('class', 'text-2xl p-4 md:text-4xl text-white');

      let infoYear = document.createElement('li');
      infoYear.setAttribute('class', 'text-2xl p-4 md:text-4xl text-white');

      let infoOverview = document.createElement('li');
      infoOverview.setAttribute('class', 'text-2xl p-4 md:text-4xl text-white');

      infoTitle.innerHTML = 'TITLE:  ' + movieTitle;
      infoCard.appendChild(infoTitle);
      listContainer.appendChild(infoCard);

      infoYear.innerHTML = 'YEAR:  ' + movieYear;
      infoCard.appendChild(infoYear);
      listContainer.appendChild(infoCard);

      infoOverview.innerHTML = 'OVERVIEW:  ' + movieOverview;
      infoCard.appendChild(infoOverview);
      listContainer.appendChild(infoCard);

      let posterSizeApiUrl =
        'https://api.themoviedb.org/3/configuration?api_key=' + apiKey;

      fetch(posterSizeApiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          // console.log(response);
          let moviePosterSize = response.images.poster_sizes[4];
          // console.log(moviePosterSize);
          // let moviePosterUrl = posterSizeApiUrl + moviePosterSize;
          // console.log(moviePosterUrl);

          let moviePoster = document.getElementById('movie-image');
          let moviePosterUrl =
            'https://image.tmdb.org/t/p/' + moviePosterSize + moviePosterPath;
          moviePoster.setAttribute('src', moviePosterUrl);
        });
    });

  return;
}

searchButton.addEventListener('click', function () {
  let searchHistory = JSON.parse(localStorage.getItem('history')) || [];
  const movie = searchInputElm.value;
  movieSearch(movie);
  searchHistory.push(movie);
  localStorage.setItem('history', JSON.stringify(searchHistory));
  console.log(searchHistory);
});

// searchButton.addEventListener('click', function (event) {
//   formSubmitHandler(event);
//   let searchHistory = JSON.parse(localStorage.getItem('history')) || [];
//   const movie = searchInputElm.value;
//   movieSearch(movie);
//   searchHistory.push(movie);
//   localStorage.setItem('history', JSON.stringify(searchHistory));
//   console.log(searchHistory);
// });
