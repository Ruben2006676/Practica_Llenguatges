// Espera a que la página esté completamente cargada
document.addEventListener('DOMContentLoaded', function () {
    const contentDiv = document.getElementById('content'); // Contenedor para mostrar la información
    const radioButtons = document.querySelectorAll('input[name="info"]'); // Botones de radio

    // Carga y muestra el JSON seleccionado
    function loadJSON(selectedValue) {
        const jsonFile = `${selectedValue}.json`; // Nombre del archivo JSON
        console.log(`Cargando: ${jsonFile}`); // Muestra el archivo que se está cargando

        fetch(jsonFile)
            .then(response => response.json()) // Convierte la respuesta en JSON
            .then(data => displayData(data)); // Muestra los datos en una tabla
    }

    // Muestra los datos en una tabla
    function displayData(data) {
        const table = createTable(data); // Crea la tabla principal
        contentDiv.innerHTML = ''; // Limpia el contenido previo
        contentDiv.appendChild(table); // Añade la tabla al contenedor
    }

    // Crea una tabla a partir de los datos
    function createTable(data) {
        const table = document.createElement('table');
        table.appendChild(createTableHeader(data[0])); // Añade el encabezado
        table.appendChild(createTableBody(data)); // Añade el cuerpo
        return table;
    }

    // Crea el encabezado de la tabla
    function createTableHeader(firstItem) {
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        Object.keys(firstItem).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        return thead;
    }

    // Crea el cuerpo de la tabla
    function createTableBody(data) {
        const tbody = document.createElement('tbody');

        data.forEach(item => {
            const row = document.createElement('tr');

            Object.entries(item).forEach(([key, value]) => {
                const cell = document.createElement('td');
                cell.textContent = formatValue(value); // Formatea el valor
                if (key === 'municipios' && Array.isArray(value)) {
                    cell.textContent = ''; // Limpia el contenido si es un array
                    cell.appendChild(createTable(value)); // Crea una tabla anidada
                }
                row.appendChild(cell);
            });

            tbody.appendChild(row);
        });

        return tbody;
    }

    // Formatea valores (arrays, objetos o valores simples)
    function formatValue(value) {
        if (Array.isArray(value)) {
            return value.map(item => item.nombre || JSON.stringify(item)).join(', ');
        } else if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value);
        }
        return value;
    }

    // Escucha cambios en los botones de radio
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function () {
            loadJSON(this.value); // Carga el JSON correspondiente
        });
    });

    // Carga el JSON inicial
    loadJSON(radioButtons[0].value);
});