const FILMS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films`;
const API_KEY = `33b36424-4fa5-41fd-9692-01649a0c6a2c`;


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
        const films = await data.items;
        console.log(films);
        showMovies(movieslist, films)
    }
    catch (err) {
        console.log(err)
    }
};
getFilms();

function createMovieCard (parrent, link, image, alt) {
    const item = document.createElement('li');
    item.innerHTML = `<a class="link movies-list__link" href="${link}"><img class="movies-list__img" src="${image}" alt="${alt}"></a>`

    parrent.append(item);

}

function showMovies (parrent, array) {
    for (let item of array) {
        let itemImage = item.posterUrl;
        let itemLink = `href="#"`;
        let itemAlt = item.nameRu;

        createMovieCard(parrent, itemLink, itemImage, itemAlt)

    }
}

