import Ajv from "ajv"; // Importa la llibreria Ajv para validar dades JSON.
import { readFile } from "fs/promises"; // Importa el mètode readFile per llegir arxius.
import type { biodiversitat } from "./atlesbiodiversitat"; // Importa el tipus 'biodiversitat' des d'un altre arxiu per tipar les dades que s'utilitzaran.
import bioSchema from "./atlesbiodiversitat.json"; // Importa el archivo JSON que probablemente contiene el esquema de validación.

const data = await readFile('./atlesbiodiversitat_vw_flora_especies.json', 'utf-8'); // Llegeix JSON amb les dades específiques de biodiversitat.
const bios: biodiversitat[] = await JSON.parse(data); // Converteix l'arxiu JSON llegit en un array d'objectes 'biodiversitat'.


//Creem constants per crear un Ajv y un validador que compili el JSON amb JSONSchema
const ajv = new Ajv()
const validateBio = ajv.compile(bioSchema)

// Filtrar només els registres que siguin vàlids
const biosValidos = bios.filter(bio => validateBio(bio))

//Utilitzem Slice per mostrar només els 5 primers arbres.
const primerosCinco = biosValidos.slice(0, 5)

//Utilitzem reduce per calcular la quantitat total de caràcters que n'hi ha a desc_cat
const totalCaracteres = biosValidos.reduce((total, bio) => total + bio.desc_cat.length, 0)

// Mostrem els resultats de la funció slice y reduce
console.log("Los primeros 5 árboles del JSON:", primerosCinco)
console.log("Número total de caracteres en todas las descripciones en catalán:", totalCaracteres)
