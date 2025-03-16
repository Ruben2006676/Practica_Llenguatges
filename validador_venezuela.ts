import Ajv from "ajv"; // Importa la librería Ajv para validar JSON.
import { readFile } from "fs/promises"; // Importa la función readFile para leer archivos.
import type { ISO } from "./typie_venezuela"; // Importa el tipo ISO desde un archivo local.
import IsoSchema from "./typie_venezuela.json"; // Importa el esquema JSON para validar los datos.
        
        // 1. Leer el archivo JSON
        const data = await readFile('./venezuela.json', 'utf-8');
        // Lee el archivo "venezuela.json" y guarda su contenido en "data".
        
        // 2. Parsear el archivo JSON a un arreglo de objetos ISO
        const isos: ISO[] = JSON.parse(data);
        // Convierte el contenido del archivo (texto) a un arreglo de objetos JSON y lo guarda en "isos".

        // 3. Configurar Ajv para validar los datos
        const ajv = new Ajv();
        // Crea una instancia de Ajv para validar JSON.
        const validateIso = ajv.compile(IsoSchema);
        // Compila el esquema JSON para usarlo en la validación.

        // 4. Validar cada objeto ISO
        isos.forEach(iso => {
        // Recorre cada objeto "iso" en el arreglo "isos".
            const valid = validateIso(iso);
            // Valida el objeto "iso" contra el esquema.
            if (!valid) {
            // Si la validación falla
                console.log("Error en validación: ", validateIso.errors);
                // Muestra los errores de validación.
            } else {
            // Si la validación es exitosa
                console.log(iso);
                // Muestra el objeto "iso" válido.
            }
        });

        // 5. Función 1: Usar reduce para contar el total de municipios
        const totalMunicipios = isos.reduce((acumulador, iso) => acumulador + iso.municipios.length, 0);
        // Suma el número de municipios de todos los estados.
        console.log("Total de municipios en todos los estados:", totalMunicipios);
        // Muestra el total de municipios.

        // 6. Función 2: Mapear para obtener nombres de estados y capitales
        const nombresEstadosCapitales = isos.map(iso => ({
        // Crea un nuevo arreglo con solo el nombre del estado y la capital.
            estado: iso.estado,
            capital: iso.capital
        }));
        console.log("Nombres de estados y capitales:", nombresEstadosCapitales);
        // Muestra el nuevo arreglo.
