import { useState } from 'react';
import WeatherCard from './components/WeatherCard';

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

      const response = await fetch(
        `http://localhost:3001/api/weather?city=${encodeURIComponent(city)}`
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'No matching location found.') {
          throw new Error('City not found. Try another search.');
        }

        throw new Error(data.error || 'Unable to fetch weather data right now.');
      }

      setWeatherData(data);
    } catch (error) {
      if (error instanceof TypeError) {
        setError('Cannot connect to the server.');
      } else {
        setError(error.message);
      }

      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <header className="app__header">
        <h1 className="app__title">Weather App</h1>
        <p className="app__subtitle">
          Search any city and explore its 10-day forecast.
        </p>
      </header>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-form__input"
          type="text"
          placeholder="Enter a city"
          value={city}
          disabled={loading}
          onChange={(event) => {
            setCity(event.target.value);
            setError(null);
          }}
        />

        <button
          className="search-form__button"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="status-message status-message--error" role="alert">
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="status-message status-message--loading" aria-live="polite">
          <p>Loading weather data...</p>
        </div>
      )}

      {weatherData && !loading && !error && (
        <section className="weather-panel">
          <section className="current-weather">
            <h2 className="current-weather__title">
              {weatherData.location.name}, {weatherData.location.region}
            </h2>

            <p className="current-weather__country">
              {weatherData.location.country}
            </p>

            <p className="current-weather__localtime">
              Local time: {weatherData.location.localtime}
            </p>

            <div className="current-weather__main">
              <img
                className="current-weather__icon"
                src={weatherData.current.conditionIcon}
                alt={weatherData.current.conditionText}
              />

              <div className="current-weather__summary">
                <h3 className="current-weather__temp">
                  {weatherData.current.temp_c}°C
                </h3>
                <p className="current-weather__condition">
                  {weatherData.current.conditionText}
                </p>
              </div>
            </div>

            <div className="current-weather__details">
              <p>Feels like: {weatherData.current.feelslike_c}°C</p>
              <p>Humidity: {weatherData.current.humidity}%</p>
              <p>Wind: {weatherData.current.wind_kph} kph</p>
            </div>
          </section>

          <section className="forecast-section">
            <h2 className="forecast-section__title">10-Day Forecast</h2>

            <div className="forecast-grid">
              {weatherData.forecast.map((day) => (
                <WeatherCard key={day.date} day={day} />
              ))}
            </div>
          </section>
        </section>
      )}
    </main>
  );
}

export default App;