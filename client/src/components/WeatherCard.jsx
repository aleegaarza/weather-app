function WeatherCard({ day }) {
  return (
    <article>
      <h3>{day.date}</h3>
      <img src={day.conditionIcon} alt={day.conditionText} />
      <p>{day.conditionText}</p>
      <p>Max: {day.maxTempC}°C</p>
      <p>Min: {day.minTempC}°C</p>
      <p>Avg: {day.avgTempC}°C</p>
      <p>Rain chance: {day.chanceOfRain}%</p>
      <p>Humidity: {day.humidity}%</p>
      <p>Wind: {day.maxWindKph} kph</p>
    </article>
  );
}

export default WeatherCard;