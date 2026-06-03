// Este servicio se encarga de hacer la 
// llamada a la API externa de WeatherAPI para obtener 
// el clima de una ciudad específica. 
// Utiliza axios para realizar la solicitud HTTP 
// y devuelve los datos obtenidos de la API.
const axios = require('axios');

const WEATHER_API_URL = 'https://api.weatherapi.com/v1/forecast.json';

const fetchWeatherByCity = async (city) => {
  const response = await axios.get(WEATHER_API_URL, {
    params: {
      key: process.env.WEATHER_API_KEY,
      q: city,
      days: 10,
      aqi: 'no',
      alerts: 'no',
    },
  });

  return response.data;
};

module.exports = {
  fetchWeatherByCity,
};