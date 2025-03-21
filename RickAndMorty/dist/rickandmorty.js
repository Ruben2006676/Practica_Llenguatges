var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// URL de la API de Rick and Morty
var LINK = 'https://rickandmortyapi.com/api/character/';
// Variables para los elementos HTML
var searchInput = document.getElementById("search");
var characterContainer = document.getElementById("character-container");
var searchButton = document.getElementById("search-button");
var suggestionsContainer = document.getElementById("suggestions-container");
// Array para almacenar los nombres de los personajes
var allCharacterNames = [];
// Función para obtener los datos de la API
function fetchCharacters() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, characters, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(LINK)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    characters = data.results;
                    allCharacterNames = characters.map(function (character) { return character.name; }); // Guardamos los nombres de los personajes
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
fetchCharacters();
// Función para mostrar sugerencias
function showCharacterSuggestions() {
    var query = searchInput.value.toLowerCase();
    if (suggestionsContainer) {
        suggestionsContainer.innerHTML = ''; // Limpiamos el contenedor de sugerencias
    }
    if (query.length > 0) {
        var filteredNames = allCharacterNames.filter(function (name) { return name.toLowerCase().startsWith(query); });
        filteredNames.forEach(function (name) {
            var suggestionItem = document.createElement('div');
            suggestionItem.textContent = name;
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.addEventListener('click', function () {
                searchInput.value = name;
                if (suggestionsContainer) {
                    suggestionsContainer.innerHTML = '';
                }
                searchCharacter(); // Llamamos a la función de búsqueda
            });
            suggestionsContainer === null || suggestionsContainer === void 0 ? void 0 : suggestionsContainer.appendChild(suggestionItem);
        });
    }
}
// Función para buscar un personaje
function searchCharacter() {
    return __awaiter(this, void 0, void 0, function () {
        var searchedCharacter, response, data, characterData, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchedCharacter = searchInput === null || searchInput === void 0 ? void 0 : searchInput.value.toLowerCase();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(LINK, "?name=").concat(searchedCharacter))];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (data.results.length === 0) {
                        throw new Error('No character found');
                    }
                    characterData = data.results[0];
                    if (characterContainer) {
                        characterContainer.innerHTML = "\n        <h3 id=\"character-name\">".concat(characterData.name, "  #").concat(characterData.id, "</h3>\n        <img id=\"character-img\" src=\"").concat(characterData.image, "\" alt=\"").concat(characterData.name, "\">\n        <p id=\"character-status\">Status: ").concat(characterData.status, "</p>\n        <p id=\"character-species\">Species: ").concat(characterData.species, "</p>\n        <p id=\"character-type\">Type: ").concat(characterData.type || 'Unknown', "</p>\n        <p id=\"character-gender\">Gender: ").concat(characterData.gender, "</p>\n        <p id=\"character-origin\">Origin: ").concat(characterData.origin.name, "</p>\n        <p id=\"character-location\">Location: ").concat(characterData.location.name, "</p>\n      ");
                    }
                    else {
                        console.error('Character Container is null');
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error(error_2);
                    if (characterContainer) {
                        characterContainer.innerHTML = "<p id=\"error-message\">Character not found. Please try again.</p>";
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Event listeners
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener("click", searchCharacter);
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        searchCharacter();
    }
});
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener("input", showCharacterSuggestions);
