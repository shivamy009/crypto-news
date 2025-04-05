import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCrypto = createAsyncThunk('crypto/fetchCrypto', async (ids) => {
  const initialIds = ['bitcoin', 'ethereum', 'ripple'];
  const allIds = [...new Set([...initialIds, ...ids])]; // Retain initial three cryptos
  const res = await fetch(`${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/markets?vs_currency=usd&ids=${allIds.join(',')}`);
  if (!res.ok) throw new Error('Crypto not found');
  const data = await res.json();
  return data.map(coin => ({
    id: coin.id,
    name: coin.name,
    current_price: coin.current_price,
    price_change_percentage_24h: coin.price_change_percentage_24h,
    market_cap: coin.market_cap,
    fully_diluted_valuation: coin.fully_diluted_valuation,
    high_24h: coin.high_24h,
    image: coin.image,
    last_updated: coin.last_updated,
    low_24h: coin.low_24h,
    market_cap_change_24h: coin.market_cap_change_24h,
    market_cap_change_percentage_24h: coin.market_cap_change_percentage_24h,
    market_cap_rank: coin.market_cap_rank,
    max_supply: coin.max_supply,
    price_change_24h: coin.price_change_24h,
  })).filter(coin => allIds.includes(coin.id)); // Filter to ensure only requested IDs are returned
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: { data: [], loading: false, error: null },
  reducers: {
    updatePrice: (state, action) => {
      state.data = state.data.map(coin =>
        coin.id === Object.keys(action.payload)[0] ? { ...coin, current_price: action.payload[coin.id] } : coin
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => { state.loading = true; })
      .addCase(fetchCrypto.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
      .addCase(fetchCrypto.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export const { updatePrice } = cryptoSlice.actions;
export default cryptoSlice.reducer;