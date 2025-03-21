//Fem el typie per validar-ho tot amb el json-schema després i un validador (que es diu starwars-schema.json y validaciostarwars.ts)
export type StarWarsCharacter = {
    name: string; // Nom del personatge
    height: string; // Altura del personatge
    mass: string; // Pes del personatje
    hair_color: string; // Color de pel
    skin_color: string; // Color de pell
    eye_color: string; // Color de ulls
    birth_year: string; // Any de naixement
    gender: string; // Gènere
  };