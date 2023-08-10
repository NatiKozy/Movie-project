import { getFilms } from "./app";

const FILMS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films`;
const API_KEY = `23fa5bf8-77b1-4e9d-8fe5-5040e6c7d436`;
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
        console.log(films)
    }
    catch (err) {
        console.log(err)
    }
};


async function getPosters(id){
        try {
            const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/images?type=POSTER`L,
            {
                method: 'GET',
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json();
        }
        catch (error) {
            console.error(error)
        }
    };

getPosters(Math.floor(Math.random() * 10))

getFilms();