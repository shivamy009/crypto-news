import { updatePrice } from '@/store/cryptoSlice';
import { toast } from 'sonner';

// Store previous prices to calculate percentage changes
let previousPrices = { bitcoin: null, ethereum: null };

export function setupWebSocket(dispatch) {
  let ws;
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5;

  const connect = () => {
    ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum');

    ws.onopen = () => {
      console.log('WebSocket connected');
      reconnectAttempts = 0;
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        console.log(data)

        // Update Redux store with new prices
        dispatch(updatePrice(data));

        // Check for significant price shifts (e.g., 1% change)
        ['bitcoin', 'ethereum'].forEach((asset) => {
          if (data[asset]) {
            const currentPrice = parseFloat(data[asset]);
            const previousPrice = previousPrices[asset];

            console.log(currentPrice, previousPrice,"dsd")

            if (previousPrice !== null) {
              const percentageChange = ((currentPrice - previousPrice) / previousPrice) * 100;
              console.log(percentageChange, "percentageChange")
              console.log(Math.abs(percentageChange), "Math.abs(percentageChange)")
              if (Math.abs(percentageChange) >0) { // 1% change threshold
                // console.log("percentageChange")
                const payload = {
                  type: 'price_alert',
                  asset: asset,
                  price: currentPrice,
                  change: percentageChange.toFixed(4),
                };
                // toast.success("knv")
                toast.success(`${asset.toUpperCase()} Price Alert`, {
                  description: `Price: $${currentPrice} (${payload.change}% change)`,
                  position: 'bottom-right'
                });
              }
            }
            previousPrices[asset] = currentPrice; // Update previous price
          }
        });
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      if (reconnectAttempts < maxReconnectAttempts) {
        const delay = Math.pow(2, reconnectAttempts) * 1000;
        console.log(`Reconnecting in ${delay / 1000} seconds...`);
        setTimeout(() => {
          reconnectAttempts++;
          connect();
        }, delay);
      } else {
        console.error('Max reconnect attempts reached. Giving up.');
      }
    };
  };

  // Simulate weather alerts every 30 seconds
  const simulateWeatherAlert = () => {
    const cities = ['New York', 'London', 'Tokyo'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const payload = {
      type: 'weather_alert',
      city: randomCity,
      message: `Severe weather warning in ${randomCity}!`,
    };
    toast.warning('Weather Alert', {
      description: payload.message,
       position: 'bottom-left'
    });
  };

  connect();

  // Start simulating weather alerts
  const weatherAlertInterval = setInterval(simulateWeatherAlert, 30000); // Every 30 seconds

  return () => {
    if (ws) {
      ws.close();
    }
    clearInterval(weatherAlertInterval); // Cleanup weather alert interval
  };
}