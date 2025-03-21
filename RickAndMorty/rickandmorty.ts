// URL de la API de Rick and Morty
const LINK = 'https://rickandmortyapi.com/api/character/';

// Variables para los elementos HTML
const searchInput = document.getElementById("search") as HTMLInputElement; // Input de búsqueda
const characterContainer = document.getElementById("character-container"); // Contenedor donde se mostrará el personaje
const searchButton = document.getElementById("search-button"); // Botón de búsqueda
const suggestionsContainer = document.getElementById("suggestions-container"); // Contenedor de sugerencias

// Interfaz para los personajes de Rick and Morty
interface Character {
  id: number; // ID del personaje
  name: string; // Nombre del personaje
  status: string; // Estado (vivo, muerto, etc.)
  species: string; // Especie (humano, alien, etc.)
  type: string; // Tipo (si es aplicable)
  gender: string; // Género
  origin: {
    name: string; // Nombre del lugar de origen
    url: string; // URL del lugar de origen
  };
  location: {
    name: string; // Nombre de la ubicación actual
    url: string; // URL de la ubicación actual
  };
  image: string; // URL de la imagen del personaje
  episode: string[]; // Lista de episodios en los que aparece
  url: string; // URL del personaje
  created: string; // Fecha de creación en la API
}

// Array para almacenar los nombres de los personajes
let allCharacterNames: string[] = [];

// Función para obtener los datos de la API
async function fetchCharacters() {
  try {
    // Hacemos una solicitud a la API para obtener todos los personajes
    const response = await fetch(LINK);
    // Convertimos la respuesta a JSON
    const data = await response.json();
    // Guardamos los resultados en un array de personajes
    const characters: Character[] = data.results;
    // Mapeamos los nombres de los personajes y los guardamos en el array allCharacterNames
    allCharacterNames = characters.map(character => character.name);
  } catch (error) {
    // Si hay un error, lo mostramos en la consola
    console.error('Error:', error);
  }
}
// Llamamos a la función fetchCharacters para cargar los nombres de los personajes al iniciar la página
fetchCharacters();

// Función para mostrar sugerencias basadas en la entrada del usuario
function showCharacterSuggestions() {
  // Obtenemos el valor del input en minúsculas
  const query = searchInput.value.toLowerCase();
  // Si el contenedor de sugerencias existe, lo limpiamos
  if (suggestionsContainer) {
    suggestionsContainer.innerHTML = '';
  }
  // Si el usuario ha escrito algo, filtramos los nombres que coincidan
  if (query.length > 0) {
    const filteredNames = allCharacterNames.filter(name => name.toLowerCase().startsWith(query));
    // Por cada nombre filtrado, creamos un elemento de sugerencia
    filteredNames.forEach(name => {
      const suggestionItem = document.createElement('div');
      // Mostramos el nombre con la primera letra en mayúscula
      suggestionItem.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      // Añadimos una clase para estilizar el elemento
      suggestionItem.classList.add('suggestion-item');
      // Añadimos un evento para cuando el usuario haga clic en una sugerencia
      suggestionItem.addEventListener('click', () => {
        // Rellenamos el input con el nombre seleccionado
        searchInput.value = name.charAt(0).toUpperCase() + name.slice(1);
        // Limpiamos el contenedor de sugerencias
        if (suggestionsContainer) {
          suggestionsContainer.innerHTML = '';
        }
        // Llamamos a la función para buscar el personaje
        searchCharacter();
      });
      // Añadimos el elemento de sugerencia al contenedor
      suggestionsContainer?.appendChild(suggestionItem);
    });
  }
}

// Función para buscar un personaje
async function searchCharacter() {
  // Obtenemos el valor del input en minúsculas
  const searchedCharacter = searchInput?.value.toLowerCase();
  try {
    // Hacemos una solicitud a la API para buscar el personaje
    const response = await fetch(`${LINK}?name=${searchedCharacter}`);
    // Si la respuesta no es exitosa, lanzamos un error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Convertimos la respuesta a JSON
    const data = await response.json();
    // Si no hay resultados, lanzamos un error
    if (data.results.length === 0) {
      throw new Error('No character found');
    }
    // Tomamos el primer resultado de la búsqueda
    const characterData: Character = data.results[0];
    // Si el contenedor del personaje existe, mostramos la información
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
      // Si el contenedor no existe, mostramos un error en la consola
      console.error('Character Container is null');
    }
  } catch (error) {
    // Si hay un error, lo mostramos en la consola
    console.error(error);
    // Si el contenedor del personaje existe, mostramos un mensaje de error
    if (characterContainer) {
      characterContainer.innerHTML = `<p id="error-message">Character not found. Please try again.</p>`;
    }
  }
}

// Event listener para el botón de búsqueda
searchButton?.addEventListener("click", searchCharacter);

// Event listener para la tecla "Enter" en el input
searchInput?.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    searchCharacter();
  }
});

// Event listener para mostrar sugerencias cuando el usuario escribe en el input
searchInput?.addEventListener("input", showCharacterSuggestions);
