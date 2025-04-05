import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { cities: [], cryptos: [] },
  reducers: {
    addFavoriteCity: (state, action) => {
      if (!state.cities.includes(action.payload)) {
        state.cities.push(action.payload);
      }
    },
    addFavoriteCrypto: (state, action) => {
      if (!state.cryptos.includes(action.payload)) {
        state.cryptos.push(action.payload);
      }
    },
    removeFavoriteCity: (state, action) => {
      state.cities = state.cities.filter(city => city !== action.payload);
    },
    removeFavoriteCrypto: (state, action) => {
      state.cryptos = state.cryptos.filter(crypto => crypto !== action.payload);
    },
  },
});

export const { addFavoriteCity, addFavoriteCrypto, removeFavoriteCity, removeFavoriteCrypto } = favoritesSlice.actions;
export default favoritesSlice.reducer;