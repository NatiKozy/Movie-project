export function sayHello (){
    console.log(`Hello!`)
}

const allFilmsUrl = `https://kinopoiskapiunofficial.tech/api/v2.2/films`;
export async function getFilms (){
    try {
        const response = await fetch(allFilmsUrl,
        {
            method: 'GET',
            headers: {
                'X-API-KEY': '23fa5bf8-77b1-4e9d-8fe5-5040e6c7d436',
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

