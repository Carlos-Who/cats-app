
"use strict";

const spinner = document.getElementById("spinner");

const catButton = document.getElementById('cat-btn');
catButton.addEventListener('click', loadPictures);

async function getPictures() {
    try {
        const API_URL = 'https://api.thecatapi.com/v1/images/search';
        const res = await fetch(API_URL);
        const data = await res.json();
        const img = document.getElementById('cat-img');
        img.src = data[0].url;

    } catch (err) {
        console.error(err);
    }
}

async function loadPictures() {
    await getPictures();
}

getPictures();



