# Proyecto Budadog Completo

## Descripción

Plataforma de reservas para Budadog con integración real a Google Sheets (CRM) y Google Calendar usando cuenta de servicio. Permite:
- Recibir reservas desde un formulario web
- Registrar automáticamente cada reserva en una hoja de Google Sheets
- Crear eventos en el calendario de Google correspondiente (por entrenador o ubicación)
- Generar emails personalizados con Handlebars

## Estructura del proyecto

- `/scripts/` — Scripts Node.js para integración con Google y generación de emails
- `/config/` — Configuración de calendarios y credenciales (NO subas credenciales a git)
- `/templates/` — Plantillas HTML para emails
- `/assets/` — Recursos estáticos (logo, etc.)
- `/salida/` — (Ignorada) Solo para archivos generados temporalmente
- `server.js` — Backend Express para recibir reservas y orquestar todo el flujo
- `index.html` — Formulario de reservas

## Configuración Google

1. **Cuenta de servicio**: Crea una en Google Cloud Console y descarga el JSON a `config/credenciales-google.json` (no subir a git).
2. **Comparte los calendarios y la hoja de cálculo** con la cuenta de servicio (permiso de edición).
3. **Edita `config/calendarios.js`** con los IDs de calendario correctos.
4. **Edita `scripts/registrarEnSheets.js`** con el ID de tu hoja de cálculo.

## Uso

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Ejecuta el backend:
   ```bash
   node server.js
   ```
3. Accede al formulario (`index.html`) y realiza una reserva. El sistema:
   - Registra la reserva en Google Sheets
   - Crea el evento en el calendario correspondiente
   - Genera el email personalizado (listo para enviar)

## Notas
- No se usan datos de prueba ni mocks. Todo funciona con datos reales del formulario.
- El sistema es fácilmente escalable: solo añade entrenadores o calendarios en `config/calendarios.js`.
- Calendly puede seguir funcionando en paralelo sin conflicto. 