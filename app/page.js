'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchWeather } from '@/store/weatherSlice';
import { fetchCrypto } from '@/store/cryptoSlice';
import { fetchNews } from '@/store/newsSlice';
// import { Toaster } from 'sonner';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { weather, crypto, news } = useSelector((state) => state);

  useEffect(() => {
    ['New York', 'London', 'Tokyo'].forEach(city => dispatch(fetchWeather(city)));
    dispatch(fetchCrypto(['bitcoin', 'ethereum', 'ripple']));
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* <Toaster/> */}
      <Card>
        <CardHeader>
          <CardTitle>Weather</CardTitle>
        </CardHeader>
        <CardContent>
          {weather.loading ? (
            <p>Loading...</p>
          ) : Object.keys(weather.data).map(city => (
            <div key={city}>{city}: {weather.data[city].main.temp}°C</div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Crypto</CardTitle>
        </CardHeader>
        <CardContent>
          {crypto.loading ? (
            <p>Loading...</p>
          ) : crypto.data.map(coin => (
            <div key={coin.id}>{coin.name}: ${coin.current_price}</div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>News</CardTitle>
        </CardHeader>
        <CardContent>
          {news.loading ? (
            <p>Loading...</p>
          ) : news.data.slice(0, 5).map((article, i) => (
            <div key={i}>{article.title}</div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}