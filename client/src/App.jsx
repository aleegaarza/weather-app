import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Ciudad enviada:', city);
  };

  return (
    <main>
      <h1>Weather App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </main>
  );
}

export default App;