import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city) => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`);
  return res.json();
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { data: {}, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => { state.loading = true; })
      .addCase(fetchWeather.fulfilled, (state, action) => { state.loading = false; state.data[action.meta.arg] = action.payload; })
      .addCase(fetchWeather.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export default weatherSlice.reducer;