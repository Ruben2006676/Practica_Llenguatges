import Ajv from "ajv"
import { readFile } from "fs/promises"
import type {biodiversitat} from "./atlesbiodiversitat"
import bioSchema from "./atlesbiodiversitat.json"

const data = await readFile('./atlesbiodiversitat_vw_flora_especies.json', 'utf-8')
const bios: biodiversitat[] = await JSON.parse(data);

const ajv = new Ajv()
const validateBio = ajv.compile(bioSchema)

bios.forEach(bio => {
    const valid = validateBio(bio)
    if(!valid){
        console.log("Error: ", validateBio.errors)
    }
    else {
        console.log(bio)
    }
})
