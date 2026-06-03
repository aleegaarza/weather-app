// app monta las rutas
const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoutes');

// Creamos la aplicación de Express que contendrá middlewares y rutas.
const app = express();

// Permite que el frontend pueda hacer peticiones a este backend.
app.use(cors());

// Le dice a Express que, si recibe JSON, lo convierta a objeto JavaScript.
app.use(express.json());

// Ruta de prueba para confirmar que el servidor está vivo.
app.get('/', (req, res) => {
  res.json({ message: 'Weather API server running' });
});

// Exportamos la app para arrancarla desde server.js.
app.use('/api', weatherRoutes);
module.exports = app;
