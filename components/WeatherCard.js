import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteCity, removeFavoriteCity } from '@/store/favoritesSlice';
import { FaStar } from 'react-icons/fa';
import CityModal from './CityModal';
import { useState } from 'react';

export default function WeatherCard({ cityWeather, isFavorite, onFavorite }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent popup from opening when clicking star
    if (isFavorite) {
      dispatch(removeFavoriteCity(cityWeather.name));
    } else {
      dispatch(addFavoriteCity(cityWeather.name));
      onFavorite();
    }
  };

  const handleCardClick = (e) => {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'svg' && e.target.tagName !== 'path') {
      setIsModalOpen(true);
    }
  };

  // Determine color based on temperature (simplified logic: compare with a baseline or trend)
  const tempColor = cityWeather.temp > 20 ? 'text-green-600' : 'text-red-600'; // Example: >20°C is positive
  const humidityColor = cityWeather.humidity > 50 ? 'text-green-600' : 'text-red-600'; // Example: >50% is positive

  return (
    <div
      className={`bg-white cursor-pointer p-4 rounded-lg shadow-md mb-4 last:mb-0 hover:shadow-lg transition-shadow ${
        isFavorite ? 'border-2 border-yellow-400 bg-yellow-50' : ''
      }`}
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {cityWeather.name}
          </p>
          <p className={`text-lg font-semibold ${tempColor}`}>
            Temp: {cityWeather.temp}°C
          </p>
          <p className={`text-lg font-semibold ${humidityColor}`}>
            Humidity: {cityWeather.humidity}%
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Condition: {cityWeather.condition}
          </p>
        </div>
        <button
          onClick={toggleFavorite}
          className="text-yellow-500 hover:text-yellow-600"
        >
          <FaStar size={20} fill={isFavorite ? 'yellow' : 'gray'} />
        </button>
      </div>
      {isModalOpen && (
        <CityModal
          city={cityWeather}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}