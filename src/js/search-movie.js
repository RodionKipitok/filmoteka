import axios from 'axios';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const optionsAxios = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTczZGFlYzM1MWNjNjFkYzcyYWIzNzVjNWNiMDMyMSIsInN1YiI6IjY0ZWVlZDk3OTdhNGU2MDBmZWE3ZDM0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AU7NFz_YUbaZZdc_gNFOqaB2ok_aPaGZ1qEgqHpx_A4',
  },
};

let currentPage = 1;
let searchQuery = '';
const searchFrom = document.querySelector('.header__form');
const searchInput = document.querySelector('.header__form-input');
const headerSearchbtn = document.querySelector('.header__search-btn');

// searchFrom.addEventListener('submit', getSearchMovie);

// async function getSearchMovie(event) {
//   event.preventDefault();

//   searchQuery = event.currentTarget.searchQuery.value;

//   const response = await axios.get(
//     `https://api.themoviedb.org/3/search/collection?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
//     optionsAxios
//   );

//   console.log(response);

//   const movieSearchAnswer = response.data.results;

//   const countPageSearch = response.data.total_pages;

//   console.log(countPageSearch);

//   drawingSearchMovieOnThePage(movieSearchAnswer);

//   getTotalPagesPaginationSearch(countPageSearch);
// }

// async function getTotalPagesPaginationSearch(countPageSearch) {
//   console.log(countPageSearch);

//   const optionsPagination = {
//     totalItems: `${countPageSearch}00`, // <---- тут должно быть  значение из функции, а оно доступно только внутри функции
//     itemsPerPage: 10,
//     visiblePages: 10,
//     page: 1,
//   };

//   console.log(optionsPagination.totalItems);

//   const paginationDiv = document.getElementById('pagination1');
//   const instance = new Pagination(paginationDiv, optionsPagination);

//   instance.on('beforeMove', function (eventData) {
//     let currentPage = eventData.page;

//     // Здесь можно выполнить действия при изменении страницы, например, загрузить новые данные
//     // или обновить отображение на текущей странице.

//     console.log(currentPage);
//     getMovieTrends(currentPage);
//   });
// }

// function drawingSearchMovieOnThePage(movieSearchAnswer) {
//   const markup = movieSearchAnswer
//     .map(movie => {
//       if (movie.poster_path !== null) {
//         return `<li><div class="card"><a href="">
//         <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.name}" srcset="">
//       </a>
//       <div class="title">
//         <h3>${movie.name}</h3>

//       </div>
//     </div></li>`;
//       } else {
//         return '';
//       }
//     })
//     .join('');

//   galleryList.innerHTML = markup;
// }

// async function getTotalPagesPaginationTrend() {
//   const response = await axios.get(
//     `https://api.themoviedb.org/3/movie/popular`,
//     optionsAxios
//   );

//   const totalPage = response.data.total_pages;

//   const optionsPagination = {
//     totalItems: totalPage, // <---- тут должно быть  значение из функции, а оно доступно только внутри функции
//     itemsPerPage: 10,
//     visiblePages: 10,
//     page: 1,
//   };

//   const paginationDiv = document.getElementById('pagination1');
//   const instance = new Pagination(paginationDiv, optionsPagination);

//   instance.on('beforeMove', function (eventData) {
//     let currentPage = eventData.page;

//     // Здесь можно выполнить действия при изменении страницы, например, загрузить новые данные
//     // или обновить отображение на текущей странице.

//     console.log(currentPage);

//   });
// }

// getTotalPagesPaginationTrend();
