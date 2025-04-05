import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCrypto = createAsyncThunk('crypto/fetchCrypto', async (ids) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/markets?vs_currency=usd&ids=${ids.join(',')}`);
  return res.json();
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