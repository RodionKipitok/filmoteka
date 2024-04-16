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
const galleryList = document.querySelector('.gallery__list');
const pagination = document.querySelector('.pagination-library-container');

console.log(searchFrom.elements.searchQuery.value);

searchFrom.addEventListener('submit', onSubmitform);

function onSubmitform(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.searchQuery.value;

  getSearchMovie(searchQuery);
}

async function getSearchMovie(searchQuery, page) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/collection?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
    optionsAxios
  );

  const movieSearchData = response.data.results;
  const countPageSearch = response.data.total_pages;

  drawingSearchMovieOnThePage(movieSearchData);
}

function drawingSearchMovieOnThePage(movieSearchData) {
  const markup = movieSearchData
    .map(movie => {
      if (movie.poster_path !== null) {
        return `
        <li><div class="card">
        <a href="">
        <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.name}" srcset="">
        </a>
        <div class="title">
        <h3>${movie.name}</h3>
        </div>
       </div>
        </li>`;
      } else {
        return;
      }
    })
    .join('');

  galleryList.innerHTML = markup;
}

// Функция для создания кнопок пагинации
function createPaginationButtons(totalPages) {
  pagination.innerHTML = '';

  // Определяем диапазон кнопок для отображения
  let startPage = 1;
  let endPage = Math.min(totalPages, 10); // Отображаем не более 10 кнопок

  // Если текущая страница находится во второй половине доступных страниц, сдвигаем диапазон
  if (currentPage > 5 && totalPages > 10) {
    startPage = currentPage - 4;
    endPage = currentPage + 5;
  }

  Array.from({ length: endPage - startPage + 1 }).forEach((_, index) => {
    const pageNumber = startPage + index;
    const btn = document.createElement('button');
    btn.classList.add('.pagination-button');
    btn.textContent = pageNumber;
    btn.addEventListener('click', () => {
      currentPage = pageNumber;
      getSearchMovie(currentPage);
    });

    // Добавляем класс на текущую страницу
    if (pageNumber === currentPage) {
      btn.classList.add('active');
    }

    pagination.appendChild(btn);
  });
}
