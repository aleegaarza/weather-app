function WeatherCard({ day }) {
  return (
    <article className="weather-card">
      <h3 className="weather-card__date">{day.date}</h3>

      <img
        className="weather-card__icon"
        src={day.conditionIcon}
        alt={day.conditionText}
      />

      <p className="weather-card__condition">{day.conditionText}</p>

      <div className="weather-card__temps">
        <p>Max: {day.maxTempC}°C</p>
        <p>Min: {day.minTempC}°C</p>
        <p>Avg: {day.avgTempC}°C</p>
      </div>

      <div className="weather-card__details">
        <p>Rain: {day.chanceOfRain}%</p>
        <p>Humidity: {day.humidity}%</p>
        <p>Wind: {day.maxWindKph} kph</p>
      </div>
    </article>
  );
}

export default WeatherCard;