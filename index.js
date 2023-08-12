const FILMS_URL = `https://api.kinopoisk.dev/v1.3/movie`;
const API_KEY = `V9WW64N-0ZMMV8V-PR39C4M-6YSG9KB`;


//получить фильмы для карточек MOVIES
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


function createMovieCard (parrent, image, alt, year, country, text) {
    const item = document.createElement('li');
    item.addEventListener('click', (event) => {
        event.preventDefault;
        showMovieModalWindow(image, alt, year, country, text);
    })
    item.innerHTML = `<img class="movies-list__img" src="${image}" alt="${alt}">`

    parrent.append(item);

}

function showMovies (parrent, array) {
    for (let item of array) {
        const itemImage = item.poster.previewUrl;
        const itemAlt = item.name;
        const itemYear = item.year;
        const itemCountry = getCountries(item.countries);
        const itemText = item.description;

        createMovieCard(parrent, itemImage, itemAlt, itemYear, itemCountry, itemText)
    }
}

//гелерея
const movieGalleryBtnLeft = document.querySelector('.gallery-btn--left');
const movieGalleryBtnRight = document.querySelector('.gallery-btn--right');


const modalWindowSection = document.querySelector('.modal-window');
const modalWindowContainer = document.querySelector('.modal-window__container');
const modalWindowTitle = document.querySelector('.modal-window__title');
const modalWindowImage = document.querySelector('.modal-window__img');
const modalWindowYear = document.querySelector('.modal-window__year');
const modalWindowCountry = document.querySelector('.modal-window__country');
const modalWindowText = document.querySelector('.modal-window__text');
const modalWindowBtn = document.querySelector('.modal-window__btn');

function showMovieModalWindow (image, alt, year, country, text) {
    modalWindowSection.classList.add('modal-window--active');
    modalWindowContainer.classList.add('modal-window__container--active');
    modalWindowBtn.classList.add('modal-window__btn--active');
    modalWindowImage.src = image;
    modalWindowTitle.textContent = alt;
    modalWindowYear.textContent = year;
    modalWindowCountry.textContent = country;
    modalWindowText.textContent = text;
}

function getCountries (array) {
    const countrues = [];
    for (let item of array){
        countrues.push(item.name)
    }
    return countrues.join(', ')
}


modalWindowBtn.addEventListener('click', (event) => {
    event.preventDefault();
    modalWindowContainer.classList.remove('modal-window__container--active')
})