const FILMS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films`;
const PREMIERS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=AUGUST`;
const API_KEY = `23fa5bf8-77b1-4e9d-8fe5-5040e6c7d436`;
const TRILLERS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=1&type=FILM`;
const DRAMAS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=2&type=FILM`;
const FANTASY_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=6&type=FILM`;
const COMEDIES_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=13&type=FILM`
const HORRIRS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=17&type=FILM`
const RANDOM_API_KEY = `23fa5bf8-77b1-4e9d-8fe5-5040e6c7d436`;
const PREMIERS_API_KEY = `3b609fe2-8b25-48b7-b53e-bf8800018895`;


async function getFilms() {
    try {
        const response = await fetch(FILMS_URL,
            {
                method: 'GET',
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
            })
        const data = await response.json();
        const films = await data.items;
        console.log(films)
    }
    catch (err) {
        console.log(err)
    }
};


getFilms();

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
        console.log(res);
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
        console.log(res);
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
        console.log(res);
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
        console.log(res);
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

const randomMovie = document.querySelector('.random__right-part')



const moviesEl = document.querySelector(".movies");
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
    moviesEl.appendChild(movieEl)
    randomMovie.appendChild(moviesEl)
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
    randomMovie.innerHTML = ''
    moviesEl.innerHTML = ''
});





function showMovies(data) {
    const moviesSearchEl = document.querySelector(".search-result");
    document.querySelector(".search-result").innerHTML = "";

    data.films.forEach((movie) => {
        const movieSearchEl = document.createElement("div");
        movieSearchEl.classList.add("movie");
        movieSearchEl.innerHTML = `
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
            (genre) => ` ${genre.genre}`)}</div>
            ${movie.rating &&`
            <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>`
            }
            </div>
            `;
        moviesSearchEl.appendChild(movieSearchEl);
    });
}

