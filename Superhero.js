function getSuperheroData() {
    const superheroDataString = localStorage.getItem('SuperheroData');
    if (superheroDataString) {
        return JSON.parse(superheroDataString);
    }
    return null;
}

function populateSuperheroDetails(superhero) {
    // Check if the 'thumbnail' property exists before accessing its 'path' and 'extension' properties
    if (superhero.thumbnail && superhero.thumbnail.path && superhero.thumbnail.extension) {
        // Populate superhero image
        document.getElementById('superhero-image').src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
    }

    // Check if the 'name' property exists before accessing it
    if (superhero.name) {
        // Populate superhero name
        document.getElementById('superhero-name').textContent = superhero.name;
    }
    

    // Check if the 'description' property exists before accessing it
    if (superhero.description) {
        // Populate superhero description
        document.getElementById('superhero-description').textContent = superhero.description;
    }

    // Populate comics list
    const comicsList = document.getElementById('comics-list');
    if (superhero.comics && superhero.comics.items) {
        superhero.comics.items.forEach(comic => {
            if (comic.name) {
                const listItem = document.createElement('li');
                listItem.textContent = comic.name;
                comicsList.appendChild(listItem);
            }
        });
    }

    // Populate events list
    const eventsList = document.getElementById('events-list');
    if (superhero.events && superhero.events.items) {
        superhero.events.items.forEach(event => {
            if (event.name) {
                const listItem = document.createElement('li');
                listItem.textContent = event.name;
                eventsList.appendChild(listItem);
            }
        });
    }

    // Populate series list
    const seriesList = document.getElementById('series-list');
    if (superhero.series && superhero.series.items) {
        superhero.series.items.forEach(series => {
            if (series.name) {
                const listItem = document.createElement('li');
                listItem.textContent = series.name;
                seriesList.appendChild(listItem);
            }
        });
    }

    // Populate stories list
    const storiesList = document.getElementById('stories-list');
    if (superhero.stories && superhero.stories.items) {
        superhero.stories.items.forEach(story => {
            if (story.name) {
                const listItem = document.createElement('li');
                listItem.textContent = story.name;
                storiesList.appendChild(listItem);
            }
        });
    }
}

// Example usage: retrieve superhero data
const superheroData = getSuperheroData();
if (superheroData  && superheroData[0]) {
    const superhero = superheroData[0];
    console.log('Superhero:', superhero);
    populateSuperheroDetails(superhero);
    
}