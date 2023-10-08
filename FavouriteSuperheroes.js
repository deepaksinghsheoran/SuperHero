document.addEventListener('DOMContentLoaded', function () {
    const favoriteSuperheroes = getFavoriteSuperheroes();

    // Get the ul element where we'll display the favorite superheroes
    const favoritesList = document.getElementById('favourite-superheroes-list');

    // Clear the previous superhero cards
    favoritesList.innerHTML = '';

    // Iterate through the favorite superheroes and create cards for each one
    for (let i = 0; i < favoriteSuperheroes.length; i++) {
        const superhero = favoriteSuperheroes[i];
        const card = createSuperheroCard(superhero, i); // Pass the index to the createSuperheroCard function
        favoritesList.appendChild(card);
    }
});


// Function to retrieve favorite superheroes from local storage
function getFavoriteSuperheroes() {
    const favoriteSuperheroesString = localStorage.getItem('favoriteSuperheroes');

    // Check if there are any favorite superheroes in local storage
    if (favoriteSuperheroesString) {
        return JSON.parse(favoriteSuperheroesString);
    } else {
        return [];
    }
}

// Function to create a superhero card
function createSuperheroCard(superhero, index) {
    const card = document.createElement('li');
    card.classList.add('card', 'mb-3');

    // Create card content
    card.innerHTML = `
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="${superhero.thumbnail.path}.${superhero.thumbnail.extension}" class="card-img" alt="${superhero.name}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${superhero.name}</h5>
                    <p class="card-text">${superhero.description}</p>
                    <button class="btn btn-secondary about-favorite" data-index="${superhero.id}" data-id="${superhero.id}">About</button>
                    <button class="btn btn-danger remove-favorite" data-index="${index}">Remove from Favorites</button>
                </div>
            </div>
        </div>
    `;

    const aboutButton = card.querySelector('.about-favorite');
    aboutButton.addEventListener('click', function () {
        const superheroId = aboutButton.getAttribute('data-id');
        const ts = 1; // Use the current timestamp
        // const hash = generateHash(ts, privateKey, publicKey);
        const publicKey = '9762b65425bb24c59cb65c3a5f8b2e29';
        const hash = '1c4d4782de4513c1766451637906b2c1';
        const apiUrl = `https://gateway.marvel.com:443/v1/public/characters/${superheroId}?apikey=${publicKey}&hash=${hash}&ts=${ts}`;

        // Fetch the superhero's data using the apiUrl
        fetch(apiUrl)
            .then(response => response.json())
            .then(superheroData => {
                // Process and display the superhero's data here
                localStorage.setItem('SuperheroData', JSON.stringify(superheroData.data.results));
                console.log('Superhero Data:', superheroData.data.results);
                // populate this data in HTML as needed
                window.location.href = 'Superhero.html';
            })
            .catch(error => {
                console.error('Error fetching superhero information:', error);
            });



    });

    // Add a click event listener to the "Remove from Favorites" button
    const removeButton = card.querySelector('.remove-favorite');
    removeButton.addEventListener('click', function () {
        const indexToRemove = parseInt(removeButton.getAttribute('data-index'));
        removeSuperheroFromFavorites(indexToRemove);
        // Remove the card from the list when the button is clicked
        card.remove();
    });

    return card;
}

// Function to remove a superhero from favorites
function removeSuperheroFromFavorites(index) {
    const favoriteSuperheroes = getFavoriteSuperheroes();

    // Check if the index is valid
    if (index >= 0 && index < favoriteSuperheroes.length) {
        // Remove the superhero from the array
        favoriteSuperheroes.splice(index, 1);
        // Update localStorage with the modified array
        localStorage.setItem('favoriteSuperheroes', JSON.stringify(favoriteSuperheroes));
        // Display an alert to notify the user
        alert(`Superhero removed from favorites.`);
    }
}