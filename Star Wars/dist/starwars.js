//Arxiu compilat des del arxiu starwars.ts
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
// URL de l'API de Star Wars (personatges)
var SWAPI_URL = 'https://swapi.dev/api/people/';
// Variables per als elements HTML
var inputSearch = document.getElementById("search"); // Camp de cerca
var characterContainer = document.getElementById("character-container"); // Contenidor del personatge
var buttonSearch = document.getElementById("search-button"); // Botó de cerca
var suggestionsContainer = document.getElementById("suggestions-container"); // Contenidor de suggeriments
// Array per emmagatzemar els noms dels personatges
var characterNamesList = [];
// Funció per obtenir les dades de l'API
function fetchStarWarsCharacters() {
    return __awaiter(this, void 0, void 0, function () {
        var apiResponse, data, characters, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(SWAPI_URL)];
                case 1:
                    apiResponse = _a.sent();
                    return [4 /*yield*/, apiResponse.json()];
                case 2:
                    data = _a.sent();
                    characters = data.results;
                    // Utilitzem reduce per extreure els noms dels personatges
                    characterNamesList = characters.reduce(function (names, character) {
                        names.push(character.name);
                        return names;
                    }, []);
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
fetchStarWarsCharacters(); // Cridem la funció per carregar els noms dels personatges
// Funció per mostrar suggeriments
function displayCharacterSuggestions() {
    var searchQuery = inputSearch.value.toLowerCase(); // Obtenim el valor de la cerca en minúscules
    if (suggestionsContainer) {
        suggestionsContainer.innerHTML = ''; // Netegem el contenidor de suggeriments
    }
    if (searchQuery.length > 0) {
        // Utilitzem slice per limitar les suggerències a les primeres 5 coincidències
        var matchingNames = characterNamesList
            .filter(function (name) { return name.toLowerCase().includes(searchQuery); }) // Filtrem els noms que coincideixen amb la cerca
            .slice(0, 5); // Limitam a 5 suggerències
        matchingNames.forEach(function (name) {
            var suggestionElement = document.createElement('div'); // Creem un div per a cada suggerència
            suggestionElement.textContent = name; // Afegim el nom del personatge
            suggestionElement.classList.add('suggestion-item'); // Afegim una classe per als estils
            suggestionElement.addEventListener('click', function () {
                inputSearch.value = name; // Omplim el camp de cerca amb el nom seleccionat
                if (suggestionsContainer) {
                    suggestionsContainer.innerHTML = ''; // Borrem les suggerències després de seleccionar-ne una
                }
                findCharacter(); // Cridem la funció de cerca
            });
            suggestionsContainer === null || suggestionsContainer === void 0 ? void 0 : suggestionsContainer.appendChild(suggestionElement); // Afegim la suggerència al contenidor
        });
    }
}
// Funció per buscar un personatge
function findCharacter() {
    return __awaiter(this, void 0, void 0, function () {
        var searchedName, apiResponse, data, characters, foundCharacter, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchedName = inputSearch === null || inputSearch === void 0 ? void 0 : inputSearch.value.toLowerCase();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(SWAPI_URL)];
                case 2:
                    apiResponse = _a.sent();
                    return [4 /*yield*/, apiResponse.json()];
                case 3:
                    data = _a.sent();
                    characters = data.results;
                    foundCharacter = characters.reduce(function (result, character) {
                        if (character.name.toLowerCase().includes(searchedName)) {
                            return character;
                        }
                        return result;
                    }, null);
                    if (foundCharacter && characterContainer) {
                        // Mostrem les dades del personatge trobat
                        characterContainer.innerHTML = "\n        <div class=\"character-card\">\n          <h3>".concat(foundCharacter.name, "</h3>\n          <p><strong>Height:</strong> ").concat(foundCharacter.height, "</p>\n          <p><strong>Mass:</strong> ").concat(foundCharacter.mass, "</p>\n          <p><strong>Hair Color:</strong> ").concat(foundCharacter.hair_color, "</p>\n          <p><strong>Skin Color:</strong> ").concat(foundCharacter.skin_color, "</p>\n          <p><strong>Eye Color:</strong> ").concat(foundCharacter.eye_color, "</p>\n          <p><strong>Birth Year:</strong> ").concat(foundCharacter.birth_year, "</p>\n          <p><strong>Gender:</strong> ").concat(foundCharacter.gender, "</p>\n        </div>\n      ");
                    }
                    else if (characterContainer) {
                        // Si no es troba el personatge, mostrem un missatge d'error
                        characterContainer.innerHTML = "<p id=\"error-message\">Character not found. Please try again.</p>";
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error(error_2);
                    if (characterContainer) {
                        // Si hi ha un error, mostrem un missatge d'error
                        characterContainer.innerHTML = "<p id=\"error-message\">An error occurred. Please try again later.</p>";
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
buttonSearch === null || buttonSearch === void 0 ? void 0 : buttonSearch.addEventListener("click", findCharacter); // Cerca en fer clic al botó
inputSearch === null || inputSearch === void 0 ? void 0 : inputSearch.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        findCharacter(); // Cerca en prémer Enter
    }
});
inputSearch === null || inputSearch === void 0 ? void 0 : inputSearch.addEventListener("input", displayCharacterSuggestions); // Mostra suggeriments mentre s'escriu
