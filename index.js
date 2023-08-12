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
        const itemCountry = item.countries;
        const itemText = item.description;

        createMovieCard(parrent, itemImage, itemAlt, itemYear, itemCountry, itemText)
    }
}
const modalWindowContainer = document.querySelector('.modal-window__container');

function showMovieModalWindow (image, alt, year,country, text) {
    modalWindowContainer.classList.add('modal-window__container--active')
    const containerStructure = `
    <div class="modal-window__img">
    <img src="${image}">
</div>
<div class="modal-window__description">
    <h3 class="modal-window__title">${alt}</h2>
    <p class="modal-window__year">${year}</p>
    <p class="modal-window__country">${country}</p>
    <p class="modal-window__text">${text}</p>
</div>
`
modalWindowContainer.innerHTML = containerStructure;
}
