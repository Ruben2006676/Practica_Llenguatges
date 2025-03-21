// URL de la API de Star Wars (personajes)
const SWAPI_URL = 'https://swapi.dev/api/people/';

// Variables para los elementos HTML
const inputSearch = document.getElementById("search") as HTMLInputElement;
const characterContainer = document.getElementById("character-container");
const buttonSearch = document.getElementById("search-button");
const suggestionsContainer = document.getElementById("suggestions-container");

// Interfaz para los personajes de Star Wars
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

// Array para almacenar los nombres de los personajes
let characterNamesList: string[] = [];

// Función para obtener los datos de la API
async function fetchStarWarsCharacters() {
  try {
    const apiResponse = await fetch(SWAPI_URL);
    const data = await apiResponse.json();
    const characters: StarWarsCharacter[] = data.results;

    // Usamos reduce para extraer los nombres de los personajes
    characterNamesList = characters.reduce((names: string[], character) => {
      names.push(character.name);
      return names;
    }, []);
  } catch (error) {
    console.error('Error:', error);
  }
}
fetchStarWarsCharacters();

// Función para mostrar sugerencias
function displayCharacterSuggestions() {
  const searchQuery = inputSearch.value.toLowerCase();
  if (suggestionsContainer) {
    suggestionsContainer.innerHTML = ''; // Limpiamos el contenedor de sugerencias
  }
  if (searchQuery.length > 0) {
    // Usamos slice para limitar las sugerencias a las primeras 5 coincidencias
    const matchingNames = characterNamesList
      .filter(name => name.toLowerCase().includes(searchQuery))
      .slice(0, 5);

    matchingNames.forEach(name => {
      const suggestionElement = document.createElement('div');
      suggestionElement.textContent = name;
      suggestionElement.classList.add('suggestion-item');
      suggestionElement.addEventListener('click', () => {
        inputSearch.value = name;
        if (suggestionsContainer) {
          suggestionsContainer.innerHTML = '';
        }
        findCharacter(); // Llamamos a la función de búsqueda
      });
      suggestionsContainer?.appendChild(suggestionElement);
    });
  }
}

// Función para buscar un personaje
async function findCharacter() {
  const searchedName = inputSearch?.value.toLowerCase();
  try {
    const apiResponse = await fetch(SWAPI_URL);
    const data = await apiResponse.json();
    const characters: StarWarsCharacter[] = data.results;

    // Usamos reduce para encontrar el primer personaje que coincida con el nombre buscado
    const foundCharacter = characters.reduce((result: StarWarsCharacter | null, character) => {
      if (character.name.toLowerCase().includes(searchedName)) {
        return character;
      }
      return result;
    }, null);

    if (foundCharacter && characterContainer) {
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
      characterContainer.innerHTML = `<p id="error-message">Character not found. Please try again.</p>`;
    }
  } catch (error) {
    console.error(error);
    if (characterContainer) {
      characterContainer.innerHTML = `<p id="error-message">An error occurred. Please try again later.</p>`;
    }
  }
}

// Event listeners
buttonSearch?.addEventListener("click", findCharacter);
inputSearch?.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    findCharacter();
  }
});
inputSearch?.addEventListener("input", displayCharacterSuggestions);
