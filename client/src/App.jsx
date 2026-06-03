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
      return;
    }
    try {
    setError("");
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
      <div>
        {weatherData && <pre>{JSON.stringify(weatherData, null, 2)}</pre>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading && <p>Loading...</p>}
      </div>
    </main>
  );
}

export default App;