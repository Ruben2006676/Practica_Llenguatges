// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Obtiene el contenedor donde se mostrará la información
    const contentDiv = document.getElementById('content');
    // Obtiene todos los botones de radio para seleccionar la información
    const radioButtons = document.querySelectorAll('input[name="info"]');

    // Función para cargar y mostrar el JSON seleccionado
    function loadJSON(selectedValue) {
        // Construye el nombre del archivo JSON basado en el valor seleccionado
        const jsonFile = `${selectedValue}.json`;
        // Muestra en la consola el archivo que se intenta cargar
        console.log(`Intentando cargar: ${jsonFile}`);
        // Realiza una solicitud para obtener el archivo JSON
        fetch(jsonFile)
            .then(response => {
                // Verifica si la respuesta es válida
                if (!response.ok) {
                    // Lanza un error si la respuesta no es válida
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                // Convierte la respuesta en formato JSON
                return response.json();
            })
            .then(data => {
                // Llama a la función para mostrar los datos en una tabla
                displayData(data);
            })
            .catch(error => {
                // Muestra un mensaje de error si hay un problema al cargar el JSON
                console.error('Error:', error);
                contentDiv.innerHTML = `<p style="color: red;">Error al cargar los datos: ${error.message}. Asegúrate de que el archivo JSON exista y esté en la ruta correcta.</p>`;
            });
    }

    // Función para mostrar los datos en una tabla
    function displayData(data) {
        // Limpia el contenido previo del contenedor
        contentDiv.innerHTML = '';

        // Verifica si los datos son un array
        if (!Array.isArray(data)) {
            // Muestra un mensaje de error si los datos no son un array
            contentDiv.innerHTML = `<p style="color: red;">El archivo JSON no contiene un array válido.</p>`;
            return;
        }

        // Crea la tabla principal
        const table = document.createElement('table');

        // Crea el encabezado de la tabla principal
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        // Verifica si hay datos para crear las columnas del encabezado
        if (data.length > 0) {
            Object.keys(data[0]).forEach(key => {
                const th = document.createElement('th');
                th.textContent = key;
                headerRow.appendChild(th);
            });
        }
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Crea el cuerpo de la tabla principal
        const tbody = document.createElement('tbody');
        // Itera sobre cada elemento del array de datos
        data.forEach(item => {
            const row = document.createElement('tr');
            // Itera sobre cada propiedad del elemento
            Object.entries(item).forEach(([key, value]) => {
                const cell = document.createElement('td');
                // Si la propiedad es 'municipios' y es un array, crea una tabla anidada
                if (key === 'municipios' && Array.isArray(value)) {
                    cell.appendChild(createNestedTable(value));
                } else {
                    // Muestra el valor directamente
                    cell.textContent = formatValue(value);
                }
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Añade la tabla principal al contenedor de contenido
        contentDiv.appendChild(table);
    }

    // Función para crear una tabla anidada
    function createNestedTable(data) {
        const nestedTable = document.createElement('table');
        nestedTable.style.width = '100%';
        nestedTable.setAttribute('border', '1');

        // Crea el encabezado de la tabla anidada
        const nestedThead = document.createElement('thead');
        const nestedHeaderRow = document.createElement('tr');
        // Verifica si hay datos para crear las columnas del encabezado
        if (data.length > 0) {
            Object.keys(data[0]).forEach(key => {
                const th = document.createElement('th');
                th.textContent = key;
                nestedHeaderRow.appendChild(th);
            });
        }
        nestedThead.appendChild(nestedHeaderRow);
        nestedTable.appendChild(nestedThead);

        // Crea el cuerpo de la tabla anidada
        const nestedTbody = document.createElement('tbody');
        // Itera sobre cada elemento del array de datos
        data.forEach(item => {
            const nestedRow = document.createElement('tr');
            // Itera sobre cada propiedad del elemento
            Object.entries(item).forEach(([key, value]) => {
                const nestedCell = document.createElement('td');
                // Muestra el valor directamente
                nestedCell.textContent = formatValue(value);
                nestedRow.appendChild(nestedCell);
            });
            nestedTbody.appendChild(nestedRow);
        });
        nestedTable.appendChild(nestedTbody);

        return nestedTable;
    }

    // Función para formatear valores (maneja arrays y objetos)
    function formatValue(value) {
        // Si el valor es un array, lo convierte en una cadena separada por comas
        if (Array.isArray(value)) {
            return value.map(item => item.nombre || JSON.stringify(item)).join(', ');
        } else if (typeof value === 'object' && value !== null) {
            // Si el valor es un objeto, lo convierte en una cadena JSON
            return JSON.stringify(value);
        } else {
            // Si el valor es simple, lo devuelve directamente
            return value;
        }
    }

    // Escucha los cambios en los botones de radio
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function () {
            // Carga el JSON correspondiente al valor seleccionado
            loadJSON(this.value);
        });
    });

    // Carga el JSON inicial (Biodiversitat)
    loadJSON(radioButtons[0].value);
});
