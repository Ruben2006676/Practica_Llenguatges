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
        const table = document.createElement('table'); //Añade la tabla
        table.appendChild(createTableHeader(data[0])); // Añade el encabezado
        table.appendChild(createTableBody(data)); // Añade el cuerpo
        return table;
    }

    // Crea el encabezado de la tabla
    function createTableHeader(firstItem) {
        const thead = document.createElement('thead'); // Crea el encabezado
        const headerRow = document.createElement('tr'); // Crea una fila

        Object.keys(firstItem).forEach(key => {
            const th = document.createElement('th'); // Crea una celda de encabezado
            th.textContent = key; // Añade el nombre de la columna
            headerRow.appendChild(th); // Añade la celda a la fila
        });

        thead.appendChild(headerRow); // Añade la fila al encabezado
        return thead; // Devuelve el encabezado
    }

    // Crea el cuerpo de la tabla
    function createTableBody(data) {
        const tbody = document.createElement('tbody'); // Crea el cuerpo

        // Recorre los elementos de los datos
        data.forEach(item => {
            const row = document.createElement('tr'); // Crea una fila

            // Recorre las propiedades de cada elemento
            Object.entries(item).forEach(([key, value]) => {
                const cell = document.createElement('td'); // Crea una celda
                cell.textContent = formatValue(value); // Formatea el valor
                // Si es un array de municipios, crea una tabla anidada
                if (key === 'municipios' && Array.isArray(value)) {
                    cell.textContent = ''; // Limpia el contenido si es un array
                    cell.appendChild(createTable(value)); // Crea una tabla anidada
                } 
                row.appendChild(cell); // Añade la celda a la fila
            });    
            tbody.appendChild(row); // Añade la fila al cuerpo
        });

        return tbody; // Devuelve el cuerpo
    }

    // Formatea valores (arrays, objetos o valores simples)
    function formatValue(value) {
        // Si es un array, muestra los nombres separados por comas
        if (Array.isArray(value)) {
            return value.map(item => item.nombre || JSON.stringify(item)).join(', '); // Muestra los nombres o el objeto como cadena
            // Si es un objeto, muestra el objeto como cadena
        } else if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value); // Muestra el objeto como cadena
        }
        return value; // Devuelve el valor tal cual
    }

    // Escucha cambios en los botones de radio
    radioButtons.forEach(radio => {
        // Cuando cambia el valor del radio, carga el JSON correspondiente
        radio.addEventListener('change', function () { 
            loadJSON(this.value); // Carga el JSON correspondiente
        });
    });

    // Carga el JSON inicial
    loadJSON(radioButtons[0].value);
});