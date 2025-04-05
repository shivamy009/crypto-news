import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteCrypto, removeFavoriteCrypto } from '@/store/favoritesSlice';
import { FaStar } from 'react-icons/fa';
import CryptoModal from './CryptoModal';
import { useState } from 'react';

export default function CryptoCard({ coin, isFavorite, onFavorite }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent popup from opening when clicking star
    if (isFavorite) {
      dispatch(removeFavoriteCrypto(coin.id));
    } else {
      dispatch(addFavoriteCrypto(coin.id));
      onFavorite();
    }
  };

  const handleCardClick = (e) => {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'svg' && e.target.tagName !== 'path') {
      setIsModalOpen(true);
    }
  };

  // Determine color based on price change percentage (positive or negative)
  const priceChangeColor = coin.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div
      className={`bg-white cursor-pointer p-4 rounded-lg shadow-md mb-4 last:mb-0 hover:shadow-lg transition-shadow ${
        isFavorite ? 'border-2 border-yellow-400 bg-yellow-50' : ''
      }`}
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-y-2">
          <img src={coin.image} alt={`${coin.name} logo`} className="w-10 h-10 mr-2 rounded-full" />
          <div className="space-y-2">
            <p className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {coin.name}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Price: ${coin.current_price.toLocaleString()}
            </p>
            <p className={`text-lg font-semibold ${priceChangeColor}`}>
              24h Change: {coin.price_change_percentage_24h}%
            </p>
          </div>
        </div>
        <button
          onClick={toggleFavorite}
          className="text-yellow-500 hover:text-yellow-600"
        >
          <FaStar size={20} fill={isFavorite ? 'yellow' : 'gray'} />
        </button>
      </div>
      {isModalOpen && (
        <CryptoModal
          coin={coin}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}