const { google } = require('googleapis');
const credenciales = require('../config/credenciales-google.json');
const config = require('../config/calendarios');

async function crearEventoCalendar(datos) {
  const auth = new google.auth.GoogleAuth({
    credentials: credenciales,
    scopes: ['https://www.googleapis.com/auth/calendar']
  });
  const calendar = google.calendar({ version: 'v3', auth });

  // Determinar el calendarId
  let calendarId = '';
  if (datos.trainer && config.entrenadores[datos.trainer]) {
    calendarId = config.entrenadores[datos.trainer].calendarId;
  } else if (datos.location && config.ubicaciones[datos.location]) {
    calendarId = config.ubicaciones[datos.location].calendarId;
  } else {
    throw new Error('No se encontró un calendarId válido');
  }

  // Crear el evento
  const evento = {
    summary: `Reserva: ${datos.fullName} (${datos.sessionType})`,
    description: datos.comments || '',
    start: { dateTime: datos.sessionDate },
    end: { dateTime: datos.sessionDate }, // Puedes sumar duración si lo deseas
    attendees: [{ email: datos.email }]
  };

  await calendar.events.insert({
    calendarId,
    resource: evento
  });
}

module.exports = crearEventoCalendar; 