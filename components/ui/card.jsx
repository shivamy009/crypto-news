import * as React from 'react';

export function Card({ className, ...props }) {
  return <div className={`bg-white rounded-lg overflow-hidden ${className}`} {...props} />;
}

export function CardHeader({ className, ...props }) {
  return <div className={`p-4 border-b ${className}`} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={`text-xl font-bold ${className}`} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={`p-4 ${className}`} {...props} />;
}