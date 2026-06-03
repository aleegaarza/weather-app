import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!city.trim()) {
    setError('Please enter a city.');
    setWeatherData(null);
      return;
    }
    try {
    setError(null);
    setWeatherData(null);
    setLoading(true);
    const response = await fetch(`http://localhost:3001/api/weather?city=${encodeURIComponent(city)}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch weather data.');
    }
    setWeatherData(data);
  } catch (error) {
    setError(error.message);
    setWeatherData(null);
  } finally {
    setLoading(false);
  }
}

  return (
    <main>
      <h1>Weather App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a city"
          value={city}
          onChange={(event) => {
            setCity(event.target.value)
            setError(null);
          }}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading weather data...</p>}
      {weatherData && !loading && !error && (
        <section>
          <h2>
            {weatherData.location.name}, {weatherData.location.region}
          </h2>
          <p>{weatherData.location.country}</p>
          <p>Local time: {weatherData.location.localtime}</p>

          <h3>{weatherData.current.temp_c}°C</h3>
          <p>Feels like: {weatherData.current.feelslike_c}°C</p>
          <p>Condition: {weatherData.current.conditionText}</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind: {weatherData.current.wind_kph} kph</p>

          <img
            src={weatherData.current.conditionIcon}
            alt={weatherData.current.conditionText}
          />
              <h2>10-Day Forecast</h2>
          <div>
            {weatherData.forecast.map((day) => (
              <article key={day.date}>
                <h3>{day.date}</h3>
                <img src={day.conditionIcon} alt={day.conditionText} />
                <p>{day.conditionText}</p>
                <p>Max: {day.maxTempC}°C</p>
                <p>Min: {day.minTempC}°C</p>
                <p>Avg: {day.avgTempC}°C</p>
                <p>Rain chance: {day.chanceOfRain}%</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default App;