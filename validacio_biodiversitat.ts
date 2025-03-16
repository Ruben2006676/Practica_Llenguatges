import Ajv from "ajv"
import { readFile } from "fs/promises"
import type { biodiversitat } from "./atlesbiodiversitat"
import bioSchema from "./atlesbiodiversitat.json"

const data = await readFile('./atlesbiodiversitat_vw_flora_especies.json', 'utf-8')
const bios: biodiversitat[] = await JSON.parse(data);

const ajv = new Ajv()
const validateBio = ajv.compile(bioSchema)

// Filtrar solo los registros que sean válidos
const biosValidos = bios.filter(bio => validateBio(bio))

// 1️⃣ Usamos `slice()` para extraer solo los primeros 5 árboles
const primerosCinco = biosValidos.slice(0, 5)

// 2️⃣ Usamos `reduce()` para contar la cantidad total de caracteres en `desc_cat`
const totalCaracteres = biosValidos.reduce((total, bio) => total + bio.desc_cat.length, 0)

// Mostrar los resultados
console.log("Los primeros 5 árboles del JSON:", primerosCinco)
console.log("Número total de caracteres en todas las descripciones en catalán:", totalCaracteres)
