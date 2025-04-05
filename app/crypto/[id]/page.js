'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { fetchCrypto } from '@/store/cryptoSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CryptoDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { crypto } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchCrypto([id]));
  }, [dispatch, id]);

  const coin = crypto.data.find(c => c.id === id);

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100">
      <Card className="shadow-lg max-w-2xl mx-auto">
        <CardHeader className="bg-green-600 text-white">
          <CardTitle>{coin?.name || 'Crypto'} Details</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {crypto.loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : coin ? (
            <div className="space-y-2">
              <p>Price: ${coin.current_price}</p>
              <p>24h Change: {coin.price_change_percentage_24h}%</p>
              <p>Market Cap: ${coin.market_cap}</p>
            </div>
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}