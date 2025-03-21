// URL de la API de Rick and Morty
const LINK = 'https://rickandmortyapi.com/api/character/';

// Variables para los elementos HTML
const searchInput = document.getElementById("search") as HTMLInputElement;
const characterContainer = document.getElementById("character-container");
const searchButton = document.getElementById("search-button");
const suggestionsContainer = document.getElementById("suggestions-container");

// Interfaz para los personajes de Rick and Morty
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

// Array para almacenar los nombres de los personajes
let allCharacterNames: string[] = [];

// Función para obtener los datos de la API
async function fetchCharacters() {
  try {
    const response = await fetch(LINK);
    const data = await response.json();
    const characters: Character[] = data.results;
    allCharacterNames = characters.map(character => character.name); // Guardamos los nombres de los personajes
  } catch (error) {
    console.error('Error:', error);
  }
}
fetchCharacters();

// Función para mostrar sugerencias
function showCharacterSuggestions() {
  const query = searchInput.value.toLowerCase();
  if (suggestionsContainer) {
    suggestionsContainer.innerHTML = ''; // Limpiamos el contenedor de sugerencias
  }
  if (query.length > 0) {
    const filteredNames = allCharacterNames.filter(name => name.toLowerCase().startsWith(query));
    filteredNames.forEach(name => {
      const suggestionItem = document.createElement('div');
      suggestionItem.textContent = name;
      suggestionItem.classList.add('suggestion-item');
      suggestionItem.addEventListener('click', () => {
        searchInput.value = name;
        if (suggestionsContainer) {
          suggestionsContainer.innerHTML = '';
        }
        searchCharacter(); // Llamamos a la función de búsqueda
      });
      suggestionsContainer?.appendChild(suggestionItem);
    });
  }
}

// Función para buscar un personaje
async function searchCharacter() {
  const searchedCharacter = searchInput?.value.toLowerCase();
  try {
    const response = await fetch(`${LINK}?name=${searchedCharacter}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.results.length === 0) {
      throw new Error('No character found');
    }
    const characterData: Character = data.results[0]; // Tomamos el primer resultado
    if (characterContainer) {
      characterContainer.innerHTML = `
        <h3 id="character-name">${characterData.name}  #${characterData.id}</h3>
        <img id="character-img" src="${characterData.image}" alt="${characterData.name}">
        <p id="character-status">Status: ${characterData.status}</p>
        <p id="character-species">Species: ${characterData.species}</p>
        <p id="character-type">Type: ${characterData.type || 'Unknown'}</p>
        <p id="character-gender">Gender: ${characterData.gender}</p>
        <p id="character-origin">Origin: ${characterData.origin.name}</p>
        <p id="character-location">Location: ${characterData.location.name}</p>
      `;
    } else {
      console.error('Character Container is null');
    }
  } catch (error) {
    console.error(error);
    if (characterContainer) {
      characterContainer.innerHTML = `<p id="error-message">Character not found. Please try again.</p>`;
    }
  }
}

// Event listeners
searchButton?.addEventListener("click", searchCharacter);
searchInput?.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    searchCharacter();
  }
});
searchInput?.addEventListener("input", showCharacterSuggestions);