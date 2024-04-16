import axios from 'axios';

const optionsAxios = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTczZGFlYzM1MWNjNjFkYzcyYWIzNzVjNWNiMDMyMSIsInN1YiI6IjY0ZWVlZDk3OTdhNGU2MDBmZWE3ZDM0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AU7NFz_YUbaZZdc_gNFOqaB2ok_aPaGZ1qEgqHpx_A4',
  },
};

const galleryList = document.querySelector('.gallery__list');
const pagination = document.querySelector('.pagination-library-container');
// Функция для загрузки данных с сервера

let currentPage = 1;

async function getMovieTrends(page) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?&page=${page}`,
      optionsAxios
    );

    console.log(response.data);

    const moviesTrendingData = response.data.results;
    const moviesTrendingTotalPage = response.data.total_pages;
    console.log(moviesTrendingTotalPage);

    drawingTrendsOnTheMainPage(moviesTrendingData);
    createPaginationButtons(moviesTrendingTotalPage);
  } catch (error) {
    console.log(error);
  }
}

// Функция для отображения элементов на странице
function drawingTrendsOnTheMainPage(moviesTrendingData) {
  const markup = moviesTrendingData
    .map(movie => {
      if (movie.poster_path !== null) {
        return `
      <li>
      <div class="card">
       <a href="" class='card__link'>
        <img class = 'card__img' src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.title}" srcset="">
       </a>
       <div class="card__title">
        <h3 class = 'card__heading'>${movie.title}</h3>
        <p class = 'card__text'>${movie.release_date}</p>
       </div>
       </div>
       </li>`;
      } else {
        return '';
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
      getMovieTrends(currentPage);
    });

    // Добавляем класс на текущую страницу
    if (pageNumber === currentPage) {
      btn.classList.add('active');
    }

    pagination.appendChild(btn);
  });
}

getMovieTrends(currentPage);
