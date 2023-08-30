import axios from "axios";



const searchFrom = document.querySelector('.header__form');
const searchInput = document.querySelector('.header__form-input');
const headerSearchbtn = document.querySelector('.header__search-btn');
const galleryList = document.querySelector('.gallery__list')


window.addEventListener('load',getMoviestrending)



async function getMoviestrending() {

	const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=2e73daec351cc61dc72ab375c5cb0321`);

	const moviesTrending = response.data.results;
	
	console.log(moviesTrending);

	drawingTrendsOntheMainpage(moviesTrending)
	
};







function drawingTrendsOntheMainpage(moviesTrending) {

const markup = moviesTrending.map((movie) => {
	return	 `<li><div class="card"><a href="">
      <img src="https://image.tmdb.org/t/p/w342${movie.backdrop_path}" alt="${movie.title}" srcset="">
    </a>
    <div class="title">
      <h3>${movie.title}</h3>
      <p>${movie.release_date}</p>
    </div>
  </div></li>`
	}).join('');

  galleryList.insertAdjacentHTML("beforeend", markup);

	//console.log(markup);
};
