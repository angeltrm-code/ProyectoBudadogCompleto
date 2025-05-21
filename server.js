const express = require('express');
const generarEmail = require('./scripts/generarEmail');
const registrarEnSheets = require('./scripts/registrarEnSheets');
const crearEventoCalendar = require('./scripts/crearEventoCalendar');
const app = express();
app.use(express.json());

app.post('/api/generar-email', async (req, res) => {
    const datos = req.body;

    // Generar el HTML del email
    const html = await generarEmail(datos, false);

    // Registrar en Google Sheets (CRM)
    try {
        await registrarEnSheets(datos);
    } catch (error) {
        return res.status(500).json({ ok: false, error: 'Error al registrar en Google Sheets: ' + error.message });
    }

    // Crear evento en Google Calendar
    try {
        await crearEventoCalendar(datos);
    } catch (error) {
        return res.status(500).json({ ok: false, error: 'Error al crear evento en Google Calendar: ' + error.message });
    }

    // Payloads para desarrollo
    const mailerLitePayload = {
        email: datos.email,
        name: datos.fullName,
        fields: {
            tipo_sesion: datos.sessionType,
            entrenador: datos.trainer,
            fecha: datos.sessionDate,
            ubicacion: datos.location,
            nombre_perro: datos.dogName,
            edad_perro: datos.dogAge
        },
        html
    };
    const twilioPayload = {
        to: datos.phone,
        from: 'TU_NUMERO_TWILIO',
        body: `🐾 BUDADOG - ¡Hola ${datos.fullName}! Te recordamos que tienes una cita con ${datos.trainer} el ${datos.sessionDate}.`
    };

    res.json({
        ok: true,
        html,
        mailerLitePayload,
        twilioPayload
    });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
}); 