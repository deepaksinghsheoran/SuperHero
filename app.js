// Marvel API credentials
const publicKey = '9762b65425bb24c59cb65c3a5f8b2e29';
const privateKey = 'cb0be7f82891d09979068cf3603ea080a70d60a8';

// Function to generate the MD5 hash for authentication
function generateHash(ts, privateKey, publicKey) {
    const input = ts + privateKey + publicKey;
    // const hash = CryptoJS.MD5(input).toString();
    let hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    console.log(hash);
    return hash;

}


document.getElementById("search-form").addEventListener('keyup', function () {
    var url = fetchCharactersByName();
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.open('get', url, true);
    xhrRequest.send();
    xhrRequest.onload = function () {
        var data = JSON.parse(xhrRequest.responseText);
        console.log(data);
        display(data);
    }
});


function display(data) {
    const superheroes = data.data.results;
    const superheroesList = document.getElementById('superheroesList');

    // Clear the previous search results
    superheroesList.innerHTML = '';

    superheroes.forEach(superhero => {
        // Create a card element for each superhero and add it to the list
        const card = document.createElement('div');
        card.classList.add('col-md-4','card', 'mb-4');
        card.innerHTML = `
            <div class="card">
                <img src="${superhero.thumbnail.path}.${superhero.thumbnail.extension}" class="card-img-top" alt="${superhero.name}">
                <div class="card-body">
                    <h5 class="card-title">${superhero.name}</h5>
                    <h3>ID: ${superhero.id}</h3>
                    <button class="btn btn-secondary about-button" data-url="${superhero.resourceURI}" data-id="${superhero.id}">About</button>
                    <button class="btn btn-primary favorite-button"  data-id="${superhero.id}">Favorite</button>
                </div>
            </div>
        `;
        superheroesList.appendChild(card);

        // Add a click event listener to the "Favorite" button
        const favoriteButton = card.querySelector('.favorite-button');
        favoriteButton.addEventListener('click', function () {
            const superheroId = favoriteButton.getAttribute('data-id');

            // Store the superhero in localStorage
            addToFavorites(superhero);

            // Optionally, provide some feedback to the user
            alert(`${superhero.name} has been added to your favorites!`);
        });
        

        // Add a click event listener to the "About" button
        const aboutButton = card.querySelector('.about-button');
        aboutButton.addEventListener('click', function () {
            const superheroId = aboutButton.getAttribute('data-id');
            const ts = Date.now(); // Use the current timestamp
            const hash = generateHash(ts, privateKey, publicKey);
            const apiUrl = `https://gateway.marvel.com:443/v1/public/characters/${superheroId}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;

            // Fetch the superhero's data using the apiUrl
            fetch(apiUrl)
                .then(response => response.json())
                .then(superheroData => {
                    // Process and display the superhero's data here
                    localStorage.setItem('SuperheroData', JSON.stringify(superheroData.data.results));
                    console.log('Superhero Data:', superheroData.data.results);

                    window.location.href = 'Superhero.html';
                })
                .catch(error => {
                    console.error('Error fetching superhero information:', error);
                });
        });
    });
}


function addToFavorites(superhero) {
    // Retrieve the current list of favorite superheroes from localStorage
    let favorites = JSON.parse(localStorage.getItem('favoriteSuperheroes')) || [];

    // Check if the superhero is already in the favorites list
    const isAlreadyFavorite = favorites.some(favorite => favorite.id === superhero.id);

    if (!isAlreadyFavorite) {
        // If the superhero is not already in favorites, add it to the list
        favorites.push(superhero);

        // Store the updated list of favorite superheroes in localStorage
        localStorage.setItem('favoriteSuperheroes', JSON.stringify(favorites));
    }
}


function initializePage() {
    const url = fetchCharactersByName('');
    fetch(url)
        .then(response => response.json())

        .then(data => {
            display(data);
        })
        .catch(error => {
            console.error('Error fetching superheroes:', error);
        });
}

window.addEventListener('load', initializePage);

function fetchCharactersByName() {

    const ts = 1;
    // const hash = generateHash(ts, privateKey, publicKey);

    const hash = '1c4d4782de4513c1766451637906b2c1';

    var nameStartsWith = document.getElementById('searchInput').value;

    console.log(nameStartsWith);

    if (!nameStartsWith) {
        console.log('Name cannot be empty!');
        return `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${ts}`
    } else {
        return `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${nameStartsWith}&apikey=${publicKey}&hash=${hash}&ts=${ts}`
    }
}


