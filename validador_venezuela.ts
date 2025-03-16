import Ajv from "ajv"
import { readFile } from "fs/promises"
import type {ISO} from "./typie_venezuela"
import IsoSchema from "./typie_venezuela.json"

const data = await readFile('./venezuela.json', 'utf-8')
const isos: ISO[] = await JSON.parse(data);

const ajv = new Ajv()
const validateIso = ajv.compile(IsoSchema)

isos.forEach(iso => {
    const valid = validateIso(iso)
    if(!valid){
        console.log("Error: ", validateIso.errors)
    }
    else {
        console.log(iso)
    }
})
