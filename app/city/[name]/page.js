'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { fetchWeather } from '@/store/weatherSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CityModal from '@/components/CityModal';

export default function CityDetail() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { weather } = useSelector((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchWeather([name]));
  }, [dispatch, name]);

  const cityWeather = weather.data.find(w => w.name === name);

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100">
      <Card className="shadow-lg max-w-2xl mx-auto">
        <CardHeader className="bg-blue-600 text-white">
          <CardTitle>{name} Weather</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {weather.loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : cityWeather ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              View Details
            </button>
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}
        </CardContent>
      </Card>
      {isModalOpen && cityWeather && (
        <CityModal city={cityWeather} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}