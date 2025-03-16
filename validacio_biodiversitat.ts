import Ajv from "ajv"; // Importa la librería Ajv para validar datos JSON contra esquemas.
import { readFile } from "fs/promises"; // Importa el método readFile para leer archivos de manera asincrónica.
import type { biodiversitat } from "./atlesbiodiversitat"; // Importa el tipo 'biodiversitat' desde otro archivo para tipar los datos que se van a manejar.
import bioSchema from "./atlesbiodiversitat.json"; // Importa el archivo JSON que probablemente contiene el esquema de validación.

const data = await readFile('./atlesbiodiversitat_vw_flora_especies.json', 'utf-8'); // Lee el archivo JSON con los datos de las especies de flora.
const bios: biodiversitat[] = await JSON.parse(data); // Convierte el archivo JSON leído en un array de objetos 'biodiversitat'.


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
