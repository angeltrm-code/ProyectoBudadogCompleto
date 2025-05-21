const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// Función principal para generar el email
async function generarEmail(datos, guardarEnArchivo = true) {
    // Leer la plantilla HTML
    const plantillaPath = path.join(__dirname, '../templates/correo-confirmacion.html');
    let html = fs.readFileSync(plantillaPath, 'utf8');

    // Leer los estilos y reemplazar el marcador
    const estilosPath = path.join(__dirname, '../templates/estilos-email.html');
    const estilos = fs.readFileSync(estilosPath, 'utf8');
    html = html.replace('{{ESTILOS}}', estilos);

    // Compilar con Handlebars
    const template = Handlebars.compile(html);
    const htmlFinal = template(datos);

    if (guardarEnArchivo) {
        const salidaPath = path.join(__dirname, '../salida/email-generado.html');
        fs.writeFileSync(salidaPath, htmlFinal, 'utf8');
        console.log('Email generado en:', salidaPath);
    }
    return htmlFinal;
}

// Ejemplo de uso (puedes borrar esto cuando lo integres con el formulario real)
if (require.main === module) {
    const datos = {
        nombre: 'Juan',
        entrenador: 'Alejandro',
        tipo: 'Adiestramiento en Budadog Park',
        fecha: '2024-06-01',
        hora: '10:00',
        ubicacion: 'Budadog Park'
    };
    generarEmail(datos);
}

module.exports = generarEmail; 