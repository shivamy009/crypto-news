'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { fetchWeather } from '@/store/weatherSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CityDetail() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { weather } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchWeather(name));
  }, [dispatch, name]);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{name} Weather</CardTitle>
        </CardHeader>
        <CardContent>
          {weather.loading ? <p>Loading...</p> : weather.data[name] && <div>Temp: {weather.data[name].main.temp}°C</div>}
        </CardContent>
      </Card>
    </div>
  );
}