const FILMS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films`;
const PREMIERS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=AUGUST`;
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
            const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/images?type=POSTER`,
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
        for(item of array) {
            const div = document.createElement('div');
            premiereImage = item.posterUrl;
            div.innerHTML = `
            <img src="${premiereImage}">
            `
            premiersContainer.append(div);

        }
    }
