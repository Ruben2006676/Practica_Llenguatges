import Ajv from "ajv"
import { readFile } from "fs/promises"
import type {biodiversitat} from "./typie_atlesbiodiversitat"
import bioSchema from "./atlesbiodiversitat_schema.json"

const data = await readFile('./atlesbiodiversitat.json', 'utf-8')
const bios: biodiversitat[] = JSON.parse(data);

const ajv = new Ajv()
const validateBio = ajv.compile(bioSchema)

const biosValidos: biodiversitat[] = [];

bios.forEach(bio => {
    const valid = validateBio(bio)
    if(!valid){
        console.log("Error: ", validateBio.errors)
    }
    else {
        biosValidos.push(bio)
    }
})

// 6. Función 1: Usar map para obtener los nombres científicos y nombres en catalán
const nombresCientificosCatala = biosValidos.map(bio => ({
    // Crea un nuevo arreglo con solo el nombre científico y el nombre en catalán.
    nom_ctf: bio.nom_ctf,
    nom_cat: bio.nom_cat
}));
console.log("Nombres científicos y nombres en catalán:", nombresCientificosCatala);
// Muestra el nuevo arreglo.

// 7. Función 2: Usar reduce para contar el total de especies con descripción en español
const totalDescCas = biosValidos.reduce((acumulador, bio) => {
    return bio.desc_cas ? acumulador + 1 : acumulador;
}, 0);
// Cuenta cuántas especies tienen descripción en español.
console.log("Total de especies con descripción en español:", totalDescCas);
// Muestra el total.
