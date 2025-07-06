import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [city, setCity] = useState('Delhi');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchForecast = async (queryCity) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8081/api/weather?city=${encodeURIComponent(queryCity)}`
      );
      setForecast(res.data.forecast);
    } catch (err) {
      console.error('Error fetching weather for', queryCity, err);
      setForecast([]); // clear on error
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial city on mount
  useEffect(() => {
    fetchForecast(city);
  }, []); // run once

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">
          🌤️ Weather Forecast
        </h1>

        {/* City input */}
        <div className="flex mb-6">
          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="Enter city"
            className="flex-1 p-2 border rounded-l"
          />
          <button
            onClick={() => fetchForecast(city)}
            className="px-4 bg-blue-600 text-white rounded-r hover:bg-blue-700"
          >
            Fetch
          </button>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : forecast.length === 0 ? (
          <p className="text-center text-gray-500">No data for "{city}"</p>
        ) : (
          <div className="space-y-4">
            {forecast.map((day, i) => (
              <div key={i} className="bg-white p-4 rounded shadow">
                <p className="text-lg font-semibold">{day.date}</p>
                <p>🌡️ High: {day.highTemp}°C | Low: {day.lowTemp}°C</p>
                <p>🌧️ Conditions: {day.conditions.join(', ')}</p>
                <p>
                  💡 Recommendation:{' '}
                  <span className="text-blue-600">{day.recommendation}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
