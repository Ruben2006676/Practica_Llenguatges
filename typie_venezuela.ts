export class ISO 
{
    iso_31662: string
    estado: string
    capital: string
    id_estado: number
    municipios: Municipio[]
    ciudades: string[]
}
class Municipio 
{
    municipio: string
    capital: string
    parroquias: string[]
}