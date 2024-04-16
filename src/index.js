import { spinnerPlay, spinnerStop } from './js/spinner';

import { renderModalMovie } from './js/API/get-movie-info';

import './js/search-movie';

import './js/switch-bg-theme';
import './js/show-movie-trend';
import { scrollFunction } from './js/button-up';
import { refs } from './js/refs';

import { onCliсkBtnWatchGallery } from './js/API/get-movie-trailer';

///Запуск спінера при завантаженні
spinnerPlay();
window.addEventListener('load', function (e) {
  spinnerStop();
});
///Закінчення спінера при завантаженні

///Запуск кнопки вверх при скролі
window.addEventListener('scroll', scrollFunction);

refs.galleryMovies.addEventListener('click', onCliсkBtnWatchGallery);
