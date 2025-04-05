'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function CityModal({ city, onClose }) {
  const mainData = city.main || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        <CardHeader className="bg-blue-600 text-white flex items-center justify-between p-4">
          <CardTitle>{city.name} Weather Details</CardTitle>
          <button
            onClick={onClose}
            className="text-white hover:text-red-300 focus:outline-none p-1 rounded-full hover:bg-blue-700 transition-colors"
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
                <td className="p-2 border">Temperature</td>
                <td className="p-2 border">{mainData.temp}°C</td>
              </tr>
              <tr>
                <td className="p-2 border">Feels Like</td>
                <td className="p-2 border">{mainData.feels_like}°C</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-2 border">Min Temperature</td>
                <td className="p-2 border">{mainData.temp_min}°C</td>
              </tr>
              <tr>
                <td className="p-2 border">Max Temperature</td>
                <td className="p-2 border">{mainData.temp_max}°C</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-2 border">Pressure</td>
                <td className="p-2 border">{mainData.pressure} hPa</td>
              </tr>
              <tr>
                <td className="p-2 border">Humidity</td>
                <td className="p-2 border">{mainData.humidity}%</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-2 border">Sea Level Pressure</td>
                <td className="p-2 border">{mainData.sea_level} hPa</td>
              </tr>
              <tr>
                <td className="p-2 border">Ground Level Pressure</td>
                <td className="p-2 border">{mainData.grnd_level} hPa</td>
              </tr>
            </tbody>
          </table>

          <p className="mt-4 text-gray-500">Chart placeholder (add Chart.js for real chart)</p>
        </CardContent>
      </Card>
    </div>
  );
}