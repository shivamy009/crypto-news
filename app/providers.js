'use client';

import { Provider } from 'react-redux';
import store from '@/store';
import { useEffect } from 'react';
import { setupWebSocket } from '@/lib/websocket';

export function WebSocketComponent() {
  useEffect(() => {
    const cleanup = setupWebSocket(store.dispatch);
    return cleanup;
  }, []);

  return null; // This component doesn’t render anything
}

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <WebSocketComponent />
      {children}
    </Provider>
  );
}