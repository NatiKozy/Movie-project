export function sayHello (){
    console.log(`Hello!`)
}

const FILMS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films`;
const API_KEY = `23fa5bf8-77b1-4e9d-8fe5-5040e6c7d436`;
export async function getFilms (){
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

