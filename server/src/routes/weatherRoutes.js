// recibe la ruta /api/weather?city=Ciudad y llama al controlador correspondiente
const express = require('express');
const { getWeatherByCity } = require('../controllers/weatherController');
const router = express.Router();

router.get('/weather', getWeatherByCity);

module.exports = router;