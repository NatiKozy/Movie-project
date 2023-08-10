const FILMS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films`;
const API_KEY = `23fa5bf8-77b1-4e9d-8fe5-5040e6c7d436`;


//получить фильмы для карточек MOVIES
const moviesContainer = document.querySelector('.movies__container');
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
        showMovies(moviesContainer, films)
    }
    catch (err) {
        console.log(err)
    }
};
getFilms();

function showMovies (parrent, array) {
    for (let item of array) {
        let itemImage = item.posterUrl;
        const movieCardContainer = document.createElement('div');
        const movieCardImage = document.createElement('img');
        movieCardContainer.append(movieCardImage);
        movieCardImage.src = itemImage;

        parrent.append(movieCardContainer)

    }
}