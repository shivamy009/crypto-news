import * as React from 'react';

export function Button({ className, ...props }) {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${className}`}
      {...props}
    />
  );
}