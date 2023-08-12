const FILMS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films`;
const PREMIERS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=AUGUST`;
const API_KEY = `23fa5bf8-77b1-4e9d-8fe5-5040e6c7d436`;
const TRILLERS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=1&type=FILM`;
const DRAMAS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=2&type=FILM`;
const FANTASY_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=6&type=FILM`;
const COMEDIES_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=13&type=FILM`
const HORRIRS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=17&type=FILM`
const RANDOM_API_KEY = `23fa5bf8-77b1-4e9d-8fe5-5040e6c7d436`;


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
                    'X-API-KEY': API_KEY,
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

getPremiers();

const premiersContainer = document.querySelector('.premiers');

function showPremiers(array) {
    for (item of array) {
        const div = document.createElement('div');
        premiereImage = item.posterUrl;
        div.innerHTML = `
            <img src="${premiereImage}">
            `
        premiersContainer.append(div);

    }
}

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

const randomMovie = document.querySelector('.random-movie')
function showRandomMovie(movie) {
    const topRandomMovie = document.querySelector('div')
    topRandomMovie.innerHTML = `<h2 class="random-movie-title">${movie.nameRu}</h2>
    <img class="random-movie-img" src="${movie.posterUrl}">
    <div class="movie__category">${movie.genres.map(
        (genre) => ` ${genre.genre}`
    )}</div>`
}


function checkSelect() {
    const selectedValue = document.getElementById("select-list").value;

    if (selectedValue === "Мелодрама") {
        getRandomDramaMovie()
    } else if (selectedValue === "Комедия") {
        getRandomComedyMovie()
    } else if (selectedValue === "Ужасы") {
        getRandomHorrorMovie()
    } else if (selectedValue === "Триллер") {
        getRandomTrillesMovie()
    }
}


const form = document.querySelector('.random-form')

form.addEventListener('change', (e) => {
    e.preventDefault();

    checkSelect()
});



