const { async } = require("regenerator-runtime");

//АНЯ НАЧАЛО секция MOVIES
const FILMS_URL_MOVIES = `https://api.kinopoisk.dev/v1.3/movie?page=1&limit=100`;
const API_KEY_MOVIES = `V9WW64N-0ZMMV8V-PR39C4M-6YSG9KB`;

const movieslist = document.querySelector('.movies-list');
const seriesList = document.querySelector('.series-list');
const cartoonList = document.querySelector('.cartoon-list');

async function getFilms (){
    try {
        const response = await fetch(FILMS_URL_MOVIES,
        {
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
    }
    catch (err) {
        console.log(err)
    }
};


function createMovieCard (parrent, image, alt, year, country,genres, text) {
    const item = document.createElement('li');
    item.classList.add('movies-list__item');
    item.addEventListener('click', (event) => {
        event.preventDefault;
        showMovieModalWindow(image, alt, year, country,genres, text);
    })
    item.innerHTML = `<img class="movies-list__img" src="${image}" alt="${alt}">`

    parrent.append(item);

}

function showMoviesCards (parrent, array) {
    for (let item of array) {
        const itemImage = item.poster.previewUrl;
        const itemAlt = item.name;
        const itemYear = item.year;
        const itemCountry = getArrayItemsList(item.countries);
        const itemGenres = getArrayItemsList(item.genres);
        const itemText = item.shortDescription;

        createMovieCard(parrent, itemImage, itemAlt, itemYear, itemCountry, itemGenres, itemText)
    }
}

function checmoviekType(array){
    for (let item of array) {
        if (item.type === "movie"){
            const movies = [];
            movies.push(item);
            showMoviesCards(movieslist, array)
        } else if (item.type === "tv-series") {
            const series = [];
            series.push(item);
            showMoviesCards(seriesList, series)
        } else if (item.type === 'cartoon'){
            const cartoons = [];
            cartoons.push(item);
            showMoviesCards(cartoonList, cartoons)
        }
    }
 }

//галерея ()
const movieGalleryBtnLeft = document.querySelector('.movies-gallery-btn--left');
const movieGalleryBtnRight = document.querySelector('.movies-gallery-btn--right');



const modalWindowSection = document.querySelector('.modal-window');
const modalWindowTitle = document.querySelector('.modal-window__title');
const modalWindowImage = document.querySelector('.modal-window__img');
const modalWindowYear = document.querySelector('.modal-window__year');
const modalWindowCountry = document.querySelector('.modal-window__country');
const modalWindowGenres = document.querySelector('.modal-window__genres');
const modalWindowText = document.querySelector('.modal-window__text');
const modalWindowBtn = document.querySelector('.modal-window__btn');

function showMovieModalWindow (image, alt, year, country, genres, text) {
    modalWindowSection.classList.add('modal-window--active');
    modalWindowImage.src = image;
    modalWindowTitle.textContent = alt;
    modalWindowYear.textContent = `Год: ${year}`;
    modalWindowCountry.textContent = `Страна: ${country}`;
    modalWindowGenres.textContent = `Жанр: ${genres}`;
    modalWindowText.textContent = text;
}

function getArrayItemsList (array) {
    const itemsList = [];
    for (let item of array){
        itemsList.push(item.name)
    }
    return itemsList.join(', ')
}


modalWindowBtn.addEventListener('click', (event) => {
    event.preventDefault();
    modalWindowSection.classList.remove('modal-window--active')
})


getFilms();

//АНЯ КОНЕЦ

//НАТАША НАЧАЛО

//slider realization//
const IMAGES = document.querySelectorAll('.slider-line img');
const SLIDER = document.querySelector('.slider-line');

//счетчик
let count = 0;
//прокрутка слайдера
function rollSlider() {
    SLIDER.style.transform = `translate(-${count*100}%)`;
}

//предыдущий
//  function prev() {
//     count --;

//     if(count < 0 ) {
//         count = IMAGES.length -1;
//     }

//  rollSlider();
// }

//следующий
// function next() {
//     count ++;

//     if (count >= IMAGES.length) {
//         count = 0;
//     }

// rollSlider();
// }

//end of slider


//НАТАША КОНЕЦ

//ЛЕНА НАЧАЛО

document.addEventListener("DOMContentLoaded", () => {
    const FILMS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films`;
    const API_KEY = `33b36424-4fa5-41fd-9692-01649a0c6a2c`;
    const API_URL_POPULAR = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1`;
    const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

    getMovies(API_URL_POPULAR);

    async function getMovies(url) {
        try {
            const resp = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": API_KEY,
                },
            });
            const respData = await resp.json();
            showMovies(respData);
        } catch (err) {
            console.log(err);
        }
    }

    function showMovies(data) {
        const moviesEl = document.querySelector(".popular-movies");

        document.querySelector(".popular-movies").innerHTML = "";

        data.films.forEach((movie) => {
            const movieEl = document.createElement("div");
            movieEl.classList.add("popular-movie");
            movieEl.innerHTML = `
                <div class="popular-movie__cover-inner">
                    <img src="${movie.posterUrlPreview}" class="popular-movie_cover" alt="${movie.nameRu}" />
                </div>
                <div class="popular-movie__info">
                    <div class="popular-movie__title">${movie.nameRu}</div>
                    <div class="popular-movie__category">${movie.genres.map(genre => ` ${genre.genre}`)}</div>
                    <div class="popular-movie__average ">${movie.rating}</div>
                </div>`;
            moviesEl.appendChild(movieEl);
        });
    }
    const form = document.querySelector("form");
    const search = document.querySelector(".header__search");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const apiSearchUrl = `${API_URL_SEARCH} ${search.value}`
        if (search.value) {
            getMovies(apiSearchUrl);
            search.value = "";
        }
    })
});

//ЛЕНА КОНЕЦ




const FILMS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films`;
const PREMIERS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=AUGUST`;
const API_KEY = `23fa5bf8-77b1-4e9d-8fe5-5040e6c7d436`;
const PREMIERS_API_KEY = `3b609fe2-8b25-48b7-b53e-bf8800018895`;


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
        console.log(premiers);
        showPremiers(premiers);
    }
    catch (err) {
        console.log(err)
    }
}



const premiersContainer = document.querySelector('.premiers');

function showPremiers(array) {
    for (item of array) {
        const div = document.createElement('div');
        div.classList.add("premiere-img");
        premiereImage = item.posterUrl;
        div.innerHTML = `
            <img src="${premiereImage}">
            `
        premiersContainer.append(div);

    }
}

getPremiers();

//ЮЛЯ НАЧАЛО

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

async function getRandomDramaMovie() {
    try {
        const response = await fetch(DRAMAS_URL,
            {
                method: 'GET',
                headers: {
                    'X-API-KEY': RANDOM_API_KEY,
                    'Content-Type': 'application/json',
                },
            })
        const data = await response.json();
        const res = arrayRandElement(data.items)
        console.log(res);
        showRandomMovie(res)
    }
    catch (error) {
        console.error(error)
    }
};

async function getRandomHorrorMovie() {
    try {
        const response = await fetch(HORRIRS_URL,
            {
                method: 'GET',
                headers: {
                    'X-API-KEY': RANDOM_API_KEY,
                    'Content-Type': 'application/json',
                },
            })
        const data = await response.json();
        const res = arrayRandElement(data.items)
        showRandomMovie(res)
    }
    catch (error) {
        console.error(error)
    }
};

async function getRandomComedyMovie() {
    try {
        const response = await fetch(COMEDIES_URL,
            {
                method: 'GET',
                headers: {
                    'X-API-KEY': RANDOM_API_KEY,
                    'Content-Type': 'application/json',
                },
            })
        const data = await response.json();
        const res = arrayRandElement(data.items)
        showRandomMovie(res)
    }
    catch (error) {
        console.error(error)
    }
};

async function getRandomFantasyMovie() {
    try {
        const response = await fetch(FANTASY_URL,
            {
                method: 'GET',
                headers: {
                    'X-API-KEY': RANDOM_API_KEY,
                    'Content-Type': 'application/json',
                },
            })
        const data = await response.json();
        const res = arrayRandElement(data.items)
        showRandomMovie(res)
    }
    catch (error) {
        console.error(error)
    }
};

async function getRandomTrillesMovie() {
    try {
        const response = await fetch(TRILLERS_URL,
            {
                method: 'GET',
                headers: {
                    'X-API-KEY': RANDOM_API_KEY,
                    'Content-Type': 'application/json',
                },
            })
        const data = await response.json();
        const res = arrayRandElement(data.items)
        showRandomMovie(res)
    }
    catch (error) {
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


const moviesEl = document.querySelector(".random-movies");
function showRandomMovie(movie) {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
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
    moviesEl.append(movieEl)
}

function checkSelect() {
    const selectedValue = document.getElementById("select-list").value;

    if (selectedValue === "Драма") {
        getRandomDramaMovie()
    } else if (selectedValue === "Комедия") {
        getRandomComedyMovie()
    } else if (selectedValue === "Ужасы") {
        getRandomHorrorMovie()
    } else if (selectedValue === "Триллер") {
        getRandomTrillesMovie()
    }
}
const randomForm = document.querySelector('.random-form')

randomForm.addEventListener('change', (e) => {
    e.preventDefault();

    checkSelect()
    moviesEl.innerHTML = ''
});


//ЮЛЯ КОНЕЦ