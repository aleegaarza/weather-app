// valida city, llama a weatherService y devuelve datos limpios al cliente
const { fetchWeatherByCity } = require('../services/weatherService');

const getWeatherByCity = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({
      error: 'City query parameter is required',
    });
  }
 try {
  const weatherData = await fetchWeatherByCity(city);
  const cleanedData = {
    location: {
        name: weatherData.location.name,
        region: weatherData.location.region,
        country: weatherData.location.country,
        localtime: weatherData.location.localtime,
    },
    current: {
        temp_c: weatherData.current.temp_c,
        feelslike_c: weatherData.current.feelslike_c,
        humidity: weatherData.current.humidity,
        wind_kph: weatherData.current.wind_kph,
        conditionText: weatherData.current.condition.text,
        conditionIcon: `https:${weatherData.current.condition.icon}`,
    },
    forecast: weatherData.forecast.forecastday.map(day => ({
        date: day.date,
        maxTempC: day.day.maxtemp_c,
        minTempC: day.day.mintemp_c,
        avgTempC: day.day.avgtemp_c,
        conditionText: day.day.condition.text,
        conditionIcon: `https:${day.day.condition.icon}`,
        chanceOfRain: day.day.daily_chance_of_rain,
        humidity: day.day.avghumidity,
        maxWindKph: day.day.maxwind_kph,
    })),
  };
  res.json(cleanedData);
 } catch (error) {
    if (error.response) {
        return res.status(error.response.status).json({
            error: error.response.data.error?.message || 'Weather API error',
        });
    }
    res.status(500).json({
        error: 'Internal server error',
    });
}
};

module.exports = {
  getWeatherByCity,
};