//АНЯ НАЧАЛО секция MOVIES
const FILMS_URL_MOVIES = `https://api.kinopoisk.dev/v1.3/movie?page=1&limit=100`;
const API_KEY_MOVIES = `V9WW64N-0ZMMV8V-PR39C4M-6YSG9KB`;

const movieslist = document.querySelector('.movies-list');
const seriesList = document.querySelector('.series-list');
const cartoonList = document.querySelector('.cartoon-list');

async function getFilms() {
    try {
        const response = await fetch(FILMS_URL_MOVIES, {
            method: 'GET',
            headers: {
                'X-API-KEY': API_KEY_MOVIES,
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        const films = await data.docs;
        console.log(films);
        checmoviekType(films)
    } catch (err) {
        console.log(err)
    }
};


function createMovieCard(parrent, image, alt, year, country, genres, text) {
    const item = document.createElement('li');
    item.classList.add('movies-list__item');
    item.addEventListener('click', (event) => {
        event.preventDefault;
        showMovieModalWindow(image, alt, year, country, genres, text);
    })
    item.innerHTML = `<img class="movies-list__img" src="${image}" alt="${alt}">`

    parrent.append(item);

}

function showMoviesCards(parrent, array) {
    for (let item of array) {
        const itemImage = item.poster.previewUrl;
        const itemAlt = item.name;
        const itemYear = item.year;
        const itemCountry = getArrayItemsList(item.countries);
        const itemGenres = getArrayItemsList(item.genres);
        const itemText = item.description;

        createMovieCard(parrent, itemImage, itemAlt, itemYear, itemCountry, itemGenres, itemText)
    }
}

function checmoviekType(array) {
    for (let item of array) {
        if (item.type === "movie") {
            const movies = [];
            movies.push(item);
            showMoviesCards(movieslist, array)
        } else if (item.type === "tv-series") {
            const series = [];
            series.push(item);
            showMoviesCards(seriesList, series)
        } else if (item.type === 'cartoon') {
            const cartoons = [];
            cartoons.push(item);
            showMoviesCards(cartoonList, cartoons)
        }
    }
}

//галерея ()

const moviesBtnLeft = document.getElementById('movie-btn--left');
const moviesBtnRight = document.getElementById('movie-btn--right');
const moviesWrapper = document.getElementById('movies-wrapper');

const seriesBtnLeft = document.getElementById('series-btn--left');
const seriesBtnRight = document.getElementById('series-btn--right');
const seriesWrapper = document.getElementById('series-wrapper');

const cartoonBtnLeft = document.getElementById('cartoon-btn--left');
const cartoonBtnRight = document.getElementById('cartoon-btn--right');
const cartoonWrapper = document.getElementById('cartoon-wrapper');



document.addEventListener(
    "DOMContentLoaded",
    function () {
        moviesBtnRight.onclick = function () {
            moviesWrapper.scrollLeft += 200;
        }
        moviesBtnLeft.onclick = function () {
            moviesWrapper.scrollLeft -= 200;
        }
        seriesBtnRight.onclick = function () {
            seriesWrapper.scrollLeft += 200;
        }
        seriesBtnLeft.onclick = function () {
            seriesWrapper.scrollLeft -= 200;
        }
        cartoonBtnRight.onclick = function () {
            cartoonWrapper.scrollLeft += 200;
        }
        cartoonBtnLeft.onclick = function () {
            cartoonWrapper.scrollLeft -= 200;
        }
    },
    false,
);



const modalWindowSection = document.querySelector('.modal-window');
const modalWindowTitle = document.querySelector('.modal-window__title');
const modalWindowImage = document.querySelector('.modal-window__img');
const modalWindowYear = document.querySelector('.modal-window__year');
const modalWindowCountry = document.querySelector('.modal-window__country');
const modalWindowGenres = document.querySelector('.modal-window__genres');
const modalWindowText = document.querySelector('.modal-window__text');
const modalWindowBtn = document.querySelector('.modal-window__btn');

function showMovieModalWindow(image, alt, year, country, genres, text) {
    modalWindowSection.classList.add('modal-window--active');
    modalWindowImage.src = image;
    modalWindowTitle.textContent = alt;
    modalWindowYear.textContent = `Год: ${year}`;
    modalWindowCountry.textContent = `Страна: ${country}`;
    modalWindowGenres.textContent = `Жанр: ${genres}`;
    modalWindowText.textContent = text;
}

function getArrayItemsList(array) {
    const itemsList = [];
    for (let item of array) {
        itemsList.push(item.name)
    }
    return itemsList.join(', ')
}

modalWindowBtn.addEventListener('click', (event) => {
    event.preventDefault();
    modalWindowSection.classList.remove('modal-window--active');
})

getFilms();

//АНЯ КОНЕЦ

//НАТАША НАЧАЛО

//slider realization//
const PREMIERS_API_KEY = `3b609fe2-8b25-48b7-b53e-bf8800018895`;
const PREMIERS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=AUGUST`;

async function getPremiers() {
    try {
        const response = await fetch(PREMIERS_URL,

            {
                method: 'GET',
                headers: {
                    'X-API-KEY': PREMIERS_API_KEY,
                    'Content-Type': 'application/json',
                },
            })
        const data = await response.json();
        const premiers = await data.items;
        showPremiers(premiers);
    } catch (err) {
        console.log(err)
    }
}

const premiereSlider = document.querySelector('.mySwiper');

function showPremiers(array) {
    for (let item of array) {
        const div = document.createElement('swiper-slide');
        const imgSrc = item.posterUrl;
        div.innerHTML =
            `
         <img src="${imgSrc}">
         `
        premiereSlider.append(div);
    }
}

getPremiers();


//НАТАША КОНЕЦ

//ЛЕНА НАЧАЛО

const FILMSS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films`;
const API_KEY_POPULAR = `33b36424-4fa5-41fd-9692-01649a0c6a2c`;
const API_URL_POPULAR = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1`;
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

const moviesElem = document.querySelector(".popular-movies");

const searchResultsEl = document.querySelector(".search-movies");
const form = document.querySelector("form");
const search = document.querySelector(".header__search");

async function getMovies(url) {
    try {
        const resp = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY_POPULAR,
            },
        });
        const respData = await resp.json();
        return respData;
    } catch (err) {
        console.log(err);
    }
}

function getClassOfRate(voting) {
    if (voting >= 7) {
        return "green";
    } else if (voting > 5) {
        return "orange";
    } else {
        return "red";
    }
}

function displayMovies(data, container) {
    container.innerHTML = "";

    if (data.films && data.films.length > 0) {
        data.films.forEach((movie) => {
            const movieEl = document.createElement("div");
            movieEl.classList.add("popular-movie");
            movieEl.innerHTML = `
                <div class="popular-movie__cover-inner">
                    <img src="${movie.posterUrlPreview}" class="popular-movie__cover" alt="${movie.nameRu}" />
                    <div class="popular-movie__cover--darkened"></div>
                </div>
                <div class="popular-movie__info">
                    <div class="popular-movie__title">${movie.nameRu}</div>
                    <div class="popular-movie__category">${movie.genres.map(genre => ` ${genre.genre}`)}</div>
                    <div class="popular-movie__average popular-movie__average--${getClassOfRate(movie.rating)}">${movie.rating}</div>
                </div>`;
            container.appendChild(movieEl);
        });
    } else {
        const noResultsEl = document.createElement("div");
        noResultsEl.classList.add("no-results");
        noResultsEl.textContent = "No movies found.";
        container.appendChild(noResultsEl);
    }
}


const modalOverlay = document.getElementById("modalOverlay");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalPrevBtn = document.getElementById("modalPrevBtn");
const modalNextBtn = document.getElementById("modalNextBtn");

let currentModalPage = 1;
let moviesPerPage = 10;
let modalMoviesData = [];

function openModal() {
    modalOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
}

modalCloseBtn.addEventListener("click", closeModal);

modalPrevBtn.addEventListener("click", () => {
    if (currentModalPage > 1) {
        currentModalPage--;
        displayMoviesInModal();
    }
});

modalNextBtn.addEventListener("click", () => {
    if ((currentModalPage * moviesPerPage) < modalMoviesData.length) {
        currentModalPage++;
        displayMoviesInModal();
    }
});

async function displaySearchResults(url) {
    const searchData = await getMovies(url);
    modalMoviesData = searchData.films;
    currentModalPage = 1;
    displayMoviesInModal();
    openModal();
}

async function displayMoviesInModal() {
    const startIdx = (currentModalPage - 1) * moviesPerPage;
    const endIdx = startIdx + moviesPerPage;
    const moviesToDisplay = modalMoviesData.slice(startIdx, endIdx);

    const modalMoviesContainer = document.querySelector(".search-movies");
    modalMoviesContainer.innerHTML = "";

    moviesToDisplay.forEach(movieData => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("search-movie");
        movieEl.innerHTML = `
              <div class="search-movie__cover-inner">
                <img src="${movieData.posterUrlPreview}" class="search-movie_cover" alt="${movieData.nameRu}" />
              </div>
              <div class="search-movie__info">
                <div class="search-movie__title">${movieData.nameRu}</div>
                <div class="search-movie__category">${movieData.genres.map(genre => ` ${genre.genre}`)}</div>
                <div class="search.movie__average ">${movieData.rating}</div>
              </div>`;
        modalMoviesContainer.appendChild(movieEl);
    });
}

async function main() {
    const popularData = await getMovies(API_URL_POPULAR);
    displayMovies(popularData, moviesElem);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (search.value) {
            const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
            displaySearchResults(apiSearchUrl);
            search.value = "";
        }
    });
}

main();
//ЛЕНА КОНЕЦ

//ЮЛЯ НАЧАЛО

const TOP_FILMS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=`
const TOP_FILMS_PAGE_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=`
const TRILLERS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=1&type=FILM`;
const DRAMAS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=2&type=FILM`;
const FANTASY_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=6&type=FILM`;
const COMEDIES_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=13&type=FILM`
const HORRIRS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=17&type=FILM`
const RANDOM_API_KEY = `23fa5bf8-77b1-4e9d-8fe5-5040e6c7d436`;


function arrayRandElement(arr) {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand]
}


async function getRandomMovie(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-API-KEY': RANDOM_API_KEY,
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        const res = arrayRandElement(data.items)
        showRandomMovie(res)
    } catch (error) {
        console.error(error)
    }
};

function getClassByRate(vote) {
    if (vote >= 7) {
        return "green";
    } else if (vote > 5) {
        return "orange";
    } else {
        return "red";
    }
}


const moviesRandomEl = document.querySelector(".random-movies");

function showRandomMovie(movie) {
    const movieEl = document.createElement("div");
    movieEl.classList.add("random__movie");
    movieEl.innerHTML = `
        <div class="movie__cover-inner">
        <img
            src="${movie.posterUrlPreview}"
            class="movie__cover"
            alt="${movie.nameRu}"/>
        <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(
        (genre) => ` ${genre.genre}`
    )}</div>
        ${movie.ratingKinopoisk &&
        `<div class="movie__average movie__average--${getClassByRate(movie.ratingKinopoisk)}">${movie.ratingKinopoisk}</div>`
        }
        </div>
        `
    moviesRandomEl.append(movieEl)
}

function checkSelect() {
    const selectedValue = document.getElementById("select-list").value;

    if (selectedValue === "Драма") {
        getRandomMovie(DRAMAS_URL)
    } else if (selectedValue === "Комедия") {
        getRandomMovie(COMEDIES_URL)
    } else if (selectedValue === "Ужасы") {
        getRandomMovie(HORRIRS_URL)
    } else if (selectedValue === "Триллер") {
        getRandomMovie(TRILLERS_URL)
    } else if (selectedValue === "Фонтастика") {
        getRandomMovie(FANTASY_URL)
    }
}
const randomForm = document.querySelector('.random-form')

randomForm.addEventListener('change', (e) => {
    e.preventDefault();

    checkSelect()
    moviesRandomEl.innerHTML = ''
});

async function getTopFilms(num) {
    try {
        const response = await fetch(`${TOP_FILMS_URL}${num}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': RANDOM_API_KEY,
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        showTopMovies(data, '.top-250-films__box')
    } catch (error) {
        console.error(error)
    }
};
getTopFilms('1')

async function getTopFilmsTwo(num) {
    try {
        const response = await fetch(`${TOP_FILMS_URL}${num}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': RANDOM_API_KEY,
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        showTopMovies(data, '.top-250-films__box-two')
    } catch (error) {
        console.error(error)
    }
};


const boxes = document.querySelector('.top-250-films__boxes')

function showTopMovies(data, conatainer) {
    const topMoviesBox = document.querySelector(conatainer);
    data.films.forEach((movie) => {
        const topMovie = document.createElement("div");
        topMovie.classList.add("top-movie");
        topMovie.innerHTML = `
        <div class="movie__cover-inner">
        <img
            src="${movie.posterUrlPreview}"
            class="movie__cover"
            alt="${movie.nameRu}"/>
        <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(
            (genre) => ` ${genre.genre}`
        )}</div>
        ${movie.rating &&
            `
        <div class="movie__average movie__average--${getClassByRate(
                movie.rating
            )}">${movie.rating}</div>
        `
            }
        </div>
        `;
        topMoviesBox.appendChild(topMovie);
        boxes.appendChild(topMoviesBox)
    });
}




function disableBtn(btn) {
    document.querySelector(btn).disabled = true;
}

function unlockBtn(btn) {
    document.querySelector(btn).disabled = false;
}
const btnTop = document.querySelector('.top-250-films__button')
const hideBtn = document.querySelector('.top-250-films__button-hide')

let numPage = 2

function countPage() {
    console.log(numPage)
    numPage += 1
}

btnTop.addEventListener('click', event => {
    event.preventDefault()
    getTopFilmsTwo(numPage)
    hideBtn.display = 'block'
    countPage()
    unlockBtn('.top-250-films__button-hide')
    showBtn()
})

const showBtn = () => {
    hideBtn.style.display = "block"
}
const hideButton = () => {
    hideBtn.style.display = "none"
}

hideBtn.addEventListener('click', event => {
    event.preventDefault()
    document.querySelector('.top-250-films__box-two').innerHTML = ''
    disableBtn('.top-250-films__button-hide')
    unlockBtn('.top-250-films__button')
    numPage = 2
    hideButton()
})
//ЮЛЯ КОНЕЦ