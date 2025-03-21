import Ajv from 'ajv';

// Importem el tipus StarWarsCharacter des de typiestarwars.ts
import { StarWarsCharacter } from './typiestarwars';

// Carreguem el JSON Schema des de starwars-schema.json
const schemaFile = Bun.file('./starwars-schema.json'); // Llegeix el fitxer JSON
const starWarsCharacterSchema = await schemaFile.json(); // Converteix el contingut a un objecte JSON

// Creem una instància de Ajv (Another JSON Schema Validator)
const ajv = new Ajv();

// Compilem el schema per poder-lo usar en la validació
const validate = ajv.compile(starWarsCharacterSchema);

// Funció per obtenir un personatge de l'API de Star Wars
async function fetchCharacter(characterId: number): Promise<StarWarsCharacter | null> {
  try {
    // Fem una sol·licitud a l'API de Star Wars per obtenir un personatge pel seu ID
    const response = await fetch(`https://swapi.dev/api/people/${characterId}/`);
    
    // Si la resposta no és exitosa, llancem un error
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    // Convertim la resposta a JSON
    const data = await response.json();
    
    // Retornem les dades del personatge com un objecte de tipus StarWarsCharacter
    return data as StarWarsCharacter;
  } catch (error) {
    // Si hi ha un error, el mostrem a la consola i retornem null
    console.error("Error obtenint el personatge:", error);
    return null;
  }
}

// Funció per filtrar el JSON i deixar només les propietats definides en el tipus StarWarsCharacter
function filterCharacterData(character: any): StarWarsCharacter {
  // Retornem un nou objecte amb només les propietats que coincideixen amb el tipus StarWarsCharacter
  return {
    name: character.name,
    height: character.height,
    mass: character.mass,
    hair_color: character.hair_color,
    skin_color: character.skin_color,
    eye_color: character.eye_color,
    birth_year: character.birth_year,
    gender: character.gender
  };
}

// Funció per validar el JSON
async function validateJson(data: StarWarsCharacter) {
  // Validem el JSON usant el schema compilat
  const isValid = validate(data);

  // Si el JSON és vàlid, mostrem un missatge d'èxit
  if (isValid) {
    console.log("El JSON és vàlid.");
  } else {
    // Si el JSON no és vàlid, mostrem els errors de validació
    console.log("Errors de validació:", validate.errors);
  }
}

// Funció principal (exemple per veure si es fa la validació, després al altre typescript és el que passem a javascript).
async function main() {
  // Obtenim un personatge de l'API (per exemple, Luke Skywalker té ID 1)
  const character = await fetchCharacter(1);

  // Si s'ha obtingut el personatge correctament
  if (character) {
    // Mostrem les dades completes del personatge
    console.log("Dades del personatge:", character);
    
    // Filtrem el JSON per deixar només les propietats definides en el tipus StarWarsCharacter
    const filteredCharacter = filterCharacterData(character);
    
    // Mostrem les dades filtrades
    console.log("Dades filtrades:", filteredCharacter);
    
    // Validem el JSON filtrat
    await validateJson(filteredCharacter);
  } else {
    // Si no s'ha pogut obtenir el personatge, mostrem un missatge d'error
    console.log("No s'ha pogut obtenir el personatge.");
  }
}

// Executem la funció principal
await main(); // Aquesta línia executa tot el procés