// Carga las variables del archivo .env a process.env.
require('dotenv').config();

// Importa la app ya configurada con rutas y middlewares.
const app = require('./app');

// Usa el puerto definido en .env o 3001 como valor por defecto.
const PORT = process.env.PORT || 3001;

// Arranca el servidor y lo deja escuchando peticiones HTTP.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
