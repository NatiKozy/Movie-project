import {
    sayHello
} from "./app";
sayHello()


const FILMS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films`;
const API_KEY = `33b36424-4fa5-41fd-9692-01649a0c6a2c`;
const API_URL_POPULAR = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1`;
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

const moviesEl = document.querySelector(".popular-movies");
const searchResultsEl = document.querySelector(".search-movies");
const form = document.querySelector("form");
const search = document.querySelector(".header__search");

async function getMovies(url) {
    try {
        const resp = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
            },
        });
        const respData = await resp.json();
        return respData;
    } catch (err) {
        console.log(err);
    }
}

function displayMovies(data, container) {
    container.innerHTML = "";

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
        container.appendChild(movieEl);
    });
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
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
              <div class="movie__cover-inner">
                <img src="${movieData.posterUrlPreview}" class="movie_cover" alt="${movieData.nameRu}" />
              </div>
              <div class="movie__info">
                <div class="movie__title">${movieData.nameRu}</div>
                <div class="movie__category">${movieData.genres.map(genre => ` ${genre.genre}`)}</div>
                <div class="movie__average ">${movieData.rating}</div>
              </div>`;
        modalMoviesContainer.appendChild(movieEl);
    });
}

async function main() {
    const popularData = await getMovies(API_URL_POPULAR);
    displayMovies(popularData, moviesEl);

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