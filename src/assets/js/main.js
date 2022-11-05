
"use strict";

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?api_key=live_dsYBwdtTtTjETYHIlm6n5d6LKsSLIJ6jpm2jYmqftm343x0TfhHEWDxFJ5wCrm5y';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_dsYBwdtTtTjETYHIlm6n5d6LKsSLIJ6jpm2jYmqftm343x0TfhHEWDxFJ5wCrm5y';
const API_URL_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_dsYBwdtTtTjETYHIlm6n5d6LKsSLIJ6jpm2jYmqftm343x0TfhHEWDxFJ5wCrm5y`;



// cat id = MTc0MzI1OA


async function getPictures() {
    try {
        const res = await fetch(API_URL_RANDOM);
        const data = await res.json();
        console.log("Data", data);
        const img = document.getElementById('card-img');
        img.src = data[0].url;

        // Add to favorites
        const favButton = document.getElementById('favorite-btn');
        favButton.addEventListener('click', ()=> {
            saveToFavorites(data[0].id);
        });

        console.log('This is data');
        console.log(data);

    } catch (err) {
        console.error(err);
    }
}

async function getFavoritesPictures() {

    document.getElementById('fav-section').innerHTML = "";
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log('Favorites');
    console.log(data);

    data.forEach(cat => {

        const favSection = document.getElementById('fav-section');

        const card = document.createElement('div');
        const cardImg = document.createElement('img');
        const cardButton = document.createElement('button');
        cardButton.textContent = 'Remove';


        cardImg.src = cat.image.url;

        card.classList.add("card");
        cardImg.classList.add("fav-img");
        cardButton.classList.add("rm-fav-btn");
        // cardButton.id

        favSection.appendChild(card);
        card.appendChild(cardImg);
        card.appendChild(cardButton);

        console.log('gato ID');
        console.log(cat.image.id);
        cardButton.onclick = () => removeFromFavorites(cat.id);

        if(res.status !== 200) {
            let error = document.getElementById('spanError');
            error.innerHTML = data.message;
        }
    });


}

async function saveToFavorites(id) {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_id: id
        })
    });


    console.log('Save');
    console.log(res);
    getFavoritesPictures();
}


async function removeFromFavorites(id) {
    const res = await fetch(API_URL_DELETE(id),{
        method: 'DELETE'
    });

    getFavoritesPictures();
}





async function loadPictures() {
    await getPictures();
}

getPictures();
getFavoritesPictures();

// Next Picture
const nextButton = document.getElementById('next-btn');
nextButton.addEventListener('click', loadPictures);








