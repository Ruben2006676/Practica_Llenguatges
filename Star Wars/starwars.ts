// URL de l'API de Star Wars (personatges)---Arxiu per compilar.
const SWAPI_URL = 'https://swapi.dev/api/people/';

// Variables per als elements HTML
const inputSearch = document.getElementById("search") as HTMLInputElement; // Camp de cerca
const characterContainer = document.getElementById("character-container"); // Contenidor del personatge
const buttonSearch = document.getElementById("search-button"); // Botó de cerca
const suggestionsContainer = document.getElementById("suggestions-container"); // Contenidor de suggeriments

// Interfície per als personatges de Star Wars
interface StarWarsCharacter {
  name: string; 
  height: string; 
  mass: string; 
  hair_color: string; 
  skin_color: string; 
  eye_color: string; 
  birth_year: string; 
  gender: string; 
  homeworld: string; 
  films: string[]; 
  species: string[]; 
  vehicles: string[]; 
  starships: string[];
  created: string; 
  edited: string;
  url: string; 
}

// Array per emmagatzemar els noms dels personatges
let characterNamesList: string[] = [];

// Funció per obtenir les dades de l'API
async function fetchStarWarsCharacters() {
  try {
    // Fem una sol·licitud a l'API de Star Wars
    const apiResponse = await fetch(SWAPI_URL);
    const data = await apiResponse.json();
    const characters: StarWarsCharacter[] = data.results;

    // Utilitzem reduce per extreure els noms dels personatges
    characterNamesList = characters.reduce((names: string[], character) => {
      names.push(character.name);
      return names;
    }, []);
  } catch (error) {
    console.error('Error:', error);
  }
}
fetchStarWarsCharacters(); // Cridem la funció per carregar els noms dels personatges

// Funció per mostrar suggeriments
function displayCharacterSuggestions() {
  const searchQuery = inputSearch.value.toLowerCase(); // Obtenim el valor de la cerca en minúscules
  if (suggestionsContainer) {
    suggestionsContainer.innerHTML = ''; // Netegem el contenidor de suggeriments
  }
  if (searchQuery.length > 0) {
    // Utilitzem slice per limitar les suggerències a les primeres 5 coincidències
    const matchingNames = characterNamesList
      .filter(name => name.toLowerCase().includes(searchQuery)) // Filtrem els noms que coincideixen amb la cerca
      .slice(0, 5); // Limitam a 5 suggerències

    matchingNames.forEach(name => {
      const suggestionElement = document.createElement('div'); // Creem un div per a cada suggerència
      suggestionElement.textContent = name; // Afegim el nom del personatge
      suggestionElement.classList.add('suggestion-item'); // Afegim una classe per als estils
      suggestionElement.addEventListener('click', () => {
        inputSearch.value = name; // Omplim el camp de cerca amb el nom seleccionat
        if (suggestionsContainer) {
          suggestionsContainer.innerHTML = ''; // Borrem les suggerències després de seleccionar-ne una
        }
        findCharacter(); // Cridem la funció de cerca
      });
      suggestionsContainer?.appendChild(suggestionElement); // Afegim la suggerència al contenidor
    });
  }
}

// Funció per buscar un personatge
async function findCharacter() {
  const searchedName = inputSearch?.value.toLowerCase(); // Obtenim el valor de la cerca en minúscules
  try {
    const apiResponse = await fetch(SWAPI_URL); // Fem una sol·licitud a l'API
    const data = await apiResponse.json();
    const characters: StarWarsCharacter[] = data.results;

    // Utilitzem reduce per trobar el primer personatge que coincideixi amb el nom buscat
    const foundCharacter = characters.reduce((result: StarWarsCharacter | null, character) => {
      if (character.name.toLowerCase().includes(searchedName)) {
        return character;
      }
      return result;
    }, null);

    if (foundCharacter && characterContainer) {
      // Mostrem les dades del personatge trobat
      characterContainer.innerHTML = `
        <div class="character-card">
          <h3>${foundCharacter.name}</h3>
          <p><strong>Height:</strong> ${foundCharacter.height}</p>
          <p><strong>Mass:</strong> ${foundCharacter.mass}</p>
          <p><strong>Hair Color:</strong> ${foundCharacter.hair_color}</p>
          <p><strong>Skin Color:</strong> ${foundCharacter.skin_color}</p>
          <p><strong>Eye Color:</strong> ${foundCharacter.eye_color}</p>
          <p><strong>Birth Year:</strong> ${foundCharacter.birth_year}</p>
          <p><strong>Gender:</strong> ${foundCharacter.gender}</p>
        </div>
      `;
    } else if (characterContainer) {
      // Si no es troba el personatge, mostrem un missatge d'error
      characterContainer.innerHTML = `<p id="error-message">Character not found. Please try again.</p>`;
    }
  } catch (error) {
    console.error(error);
    if (characterContainer) {
      // Si hi ha un error, mostrem un missatge d'error
      characterContainer.innerHTML = `<p id="error-message">An error occurred. Please try again later.</p>`;
    }
  }
}

buttonSearch?.addEventListener("click", findCharacter); // Cerca en fer clic al botó
inputSearch?.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    findCharacter(); // Cerca en prémer Enter
  }
});
inputSearch?.addEventListener("input", displayCharacterSuggestions); // Mostra suggeriments mentre s'escriu