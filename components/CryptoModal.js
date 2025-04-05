'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function CryptoModal({ coin, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        <CardHeader className="bg-green-600 text-white flex items-center justify-between p-4">
          <CardTitle>{coin.name} Details</CardTitle>
          <button
            onClick={onClose}
            className="text-white hover:text-red-300 focus:outline-none p-1 rounded-full hover:bg-green-700 transition-colors"
          >
            ✕
          </button>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mt-4 mb-2">Detailed Data</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Parameter</th>
                <th className="p-2 border">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100">
                <td className="p-2 border">Current Price</td>
                <td className="p-2 border">${coin.current_price}</td>
              </tr>
              <tr>
                <td className="p-2 border">Fully Diluted Valuation</td>
                <td className="p-2 border">${coin.fully_diluted_valuation?.toLocaleString() || 'N/A'}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-2 border">High 24h</td>
                <td className="p-2 border">${coin.high_24h?.toLocaleString() || 'N/A'}</td>
              </tr>
              <tr>
                <td className="p-2 border">Low 24h</td>
                <td className="p-2 border">${coin.low_24h?.toLocaleString() || 'N/A'}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-2 border">Market Cap</td>
                <td className="p-2 border">${coin.market_cap?.toLocaleString() || 'N/A'}</td>
              </tr>
              <tr>
                <td className="p-2 border">Market Cap Change 24h</td>
                <td className="p-2 border">${coin.market_cap_change_24h?.toLocaleString() || 'N/A'}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-2 border">Market Cap Change % 24h</td>
                <td className="p-2 border">{coin.market_cap_change_percentage_24h}%</td>
              </tr>
              <tr>
                <td className="p-2 border">Market Cap Rank</td>
                <td className="p-2 border">{coin.market_cap_rank || 'N/A'}</td>
              </tr>
              <tr>
                <td className="p-2 border">Price Change 24h</td>
                <td className="p-2 border">${coin.price_change_24h?.toLocaleString() || 'N/A'}</td>
              </tr>
            </tbody>
          </table>

          <p className="mt-4 text-gray-500">Chart placeholder (add Chart.js for real chart)</p>
        </CardContent>
      </Card>
    </div>
  );
}