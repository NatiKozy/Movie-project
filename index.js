//секция MOVIES
const FILMS_URL = `https://api.kinopoisk.dev/v1.3/movie`;
const API_KEY = `V9WW64N-0ZMMV8V-PR39C4M-6YSG9KB`;

const movieslist = document.querySelector('.movies-list');

async function getFilms (){
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
        const films = await data.docs;
        console.log(films);
        showMovies(movieslist, films)
    }
    catch (err) {
        console.log(err)
    }
};
getFilms();


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

function showMovies (parrent, array) {
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

//гелерея
const movieGalleryBtnLeft = document.querySelector('.gallery-btn--left');
const movieGalleryBtnRight = document.querySelector('.gallery-btn--right');



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

