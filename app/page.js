'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchWeather } from '@/store/weatherSlice';
import { fetchCrypto } from '@/store/cryptoSlice';
import { fetchNews } from '@/store/newsSlice';
import { addFavoriteCity, addFavoriteCrypto } from '@/store/favoritesSlice';
import { toast } from 'sonner';
import { FaSearch } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton loader
import 'react-loading-skeleton/dist/skeleton.css'; // Import Skeleton CSS
import WeatherCard from '@/components/WeatherCard';
import CryptoCard from '@/components/CryptoCard';
import NewsCard from '@/components/NewsCard';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { weather, crypto, news, favorites } = useSelector((state) => state);
  const [citySearch, setCitySearch] = useState('');
  const [cryptoSearch, setCryptoSearch] = useState('');

  useEffect(() => {
    dispatch(fetchWeather(['New York', 'London', 'Tokyo']));
    dispatch(fetchCrypto(['bitcoin', 'ethereum', 'ripple']));
    dispatch(fetchNews());
  }, [dispatch]);

  const handleCitySearch = async (e) => {
    if (e.key === 'Enter' && citySearch.trim()) {
      const city = citySearch.trim();
      try {
        const result = await dispatch(fetchWeather([city])).unwrap();
        if (result.length === 0 || !result.some(w => w.name === city)) {
          toast.error('This city not found', { position: 'top-right' });
        }
      } catch (error) {
        toast.error('This city not found', { position: 'top-right' });
      }
      setCitySearch('');
    }
  };

  const handleCryptoSearch = async (e) => {
    if (e.key === 'Enter' && cryptoSearch.trim()) {
      const cryptoId = cryptoSearch.trim().toLowerCase();
      try {
        const result = await dispatch(fetchCrypto([cryptoId])).unwrap();
        if (result.length === 0 || !result.some(c => c.id === cryptoId)) {
          toast.error('This crypto not found', { position: 'top-right' });
        }
      } catch (error) {
        toast.error('This crypto not found', { position: 'top-right' });
      }
      setCryptoSearch('');
    }
  };

  const handleCitySearchClick = async () => {
    if (citySearch.trim()) {
      const city = citySearch.trim();
      try {
        const result = await dispatch(fetchWeather([city])).unwrap();
        if (result.length === 0 || !result.some(w => w.name === city)) {
          toast.error('This city not found', { position: 'top-right' });
        }
      } catch (error) {
        toast.error('This city not found', { position: 'top-right' });
      }
      setCitySearch('');
    }
  };

  const handleCryptoSearchClick = async () => {
    if (cryptoSearch.trim()) {
      const cryptoId = cryptoSearch.trim().toLowerCase();
      try {
        const result = await dispatch(fetchCrypto([cryptoId])).unwrap();
        if (result.length === 0 || !result.some(c => c.id === cryptoId)) {
          toast.error('This crypto not found', { position: 'top-right' });
        }
      } catch (error) {
        toast.error('This crypto not found', { position: 'top-right' });
      }
      setCryptoSearch('');
    }
  };

  // Skeleton loader for 3 cards (matching initial data length)
  const renderWeatherSkeleton = () => (
    Array(3).fill().map((_, index) => (
      <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4 last:mb-0 animate-pulse">
        <Skeleton height={80} />
      </div>
    ))
  );

  const renderCryptoSkeleton = () => (
    Array(3).fill().map((_, index) => (
      <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4 last:mb-0 animate-pulse">
        <Skeleton height={80} />
      </div>
    ))
  );

  const renderNewsSkeleton = () => (
    Array(5).fill().map((_, index) => (
      <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4 last:mb-0 animate-pulse">
        <Skeleton height={60} />
      </div>
    ))
  );

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg ">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle>Weather</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="relative mb-4">
              <input
                type="text"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                onKeyPress={handleCitySearch}
                placeholder="Search city..."
                className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleCitySearchClick}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <FaSearch size={16} />
              </button>
            </div>
            {weather.loading ? (
              renderWeatherSkeleton()
            ) : (
              weather.data.map((cityWeather, index) => (
                <WeatherCard
                  key={index}
                  cityWeather={cityWeather}
                  isFavorite={favorites.cities.includes(cityWeather.name)}
                  onFavorite={() => dispatch(addFavoriteCity(cityWeather.name))}
                />
              ))
            )}
          </CardContent>
        </Card>
        <Card className="shadow-lg ">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle>Crypto</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="relative mb-4">
              <input
                type="text"
                value={cryptoSearch}
                onChange={(e) => setCryptoSearch(e.target.value)}
                onKeyPress={handleCryptoSearch}
                placeholder="Search crypto..."
                className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleCryptoSearchClick}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <FaSearch size={16} />
              </button>
            </div>
            {crypto.loading ? (
              renderCryptoSkeleton()
            ) : (
              crypto.data.map((coin, index) => (
                <CryptoCard
                  key={index}
                  coin={coin}
                  isFavorite={favorites.cryptos.includes(coin.id)}
                  onFavorite={() => dispatch(addFavoriteCrypto(coin.id))}
                />
              ))
            )}
          </CardContent>
        </Card>
        <Card className="shadow-lg ">
          <CardHeader className="bg-purple-600 text-white">
            <CardTitle>News</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {news.loading ? (
              renderNewsSkeleton()
            ) : (
              <NewsCard articles={news.data.slice(0, 5)} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}