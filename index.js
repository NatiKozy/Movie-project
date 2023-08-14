import {
    sayHello
} from "./app";
sayHello()


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
    const moviesEl = document.querySelector(".movies");

    document.querySelector(".movies").innerHTML = "";

    data.films.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
                <div class="movie__cover-inner">
                    <img src="${movie.posterUrlPreview}" class="movie_cover" alt="${movie.nameRu}" />
                </div>
                <div class="movie__info">
                    <div class="movie__title">${movie.nameRu}</div>
                    <div class="movie__category">${movie.genres.map(genre => ` ${genre.genre}`)}</div>
                    <div class="movie__average ">${movie.rating}</div>
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
});