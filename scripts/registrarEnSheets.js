const { google } = require('googleapis');
const credenciales = require('../config/credenciales-google.json');

async function registrarEnSheets(datos) {
  const auth = new google.auth.GoogleAuth({
    credentials: credenciales,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = 'TU_ID_DE_SHEET'; // <-- Cambia esto por tu ID real

  const fila = [
    datos.fullName,
    datos.email,
    datos.phone,
    datos.sessionType,
    datos.trainer,
    datos.sessionDate ? datos.sessionDate.split('T')[0] : '',
    datos.sessionDate ? datos.sessionDate.split('T')[1] : '',
    datos.comments || ''
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Reservas!A2',
    valueInputOption: 'USER_ENTERED',
    resource: { values: [fila] }
  });
}

module.exports = registrarEnSheets; 