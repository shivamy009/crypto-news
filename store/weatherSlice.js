import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (cities) => {
  const initialCities = ['New York', 'London', 'Tokyo'];
  const allCities = [...new Set([...initialCities, ...cities])]; // Retain initial three cities
  const weatherData = await Promise.all(
    allCities.map(async (city) => {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`);
        if (!res.ok) throw new Error('City not found');
        const data = await res.json();
        return {
          name: city,
          temp: data.main.temp,
          humidity: data.main.humidity,
          condition: data.weather[0].description,
          main: data.main, // Include full main object
        };
      } catch (error) {
        return { name: city, error: 'Not found' }; // Return error object for invalid cities
      }
    })
  );
  return weatherData.filter(item => !item.error); // Filter out invalid cities
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => { state.loading = true; })
      .addCase(fetchWeather.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
      .addCase(fetchWeather.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export default weatherSlice.reducer;