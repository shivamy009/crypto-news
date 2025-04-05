import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const res = await fetch(`https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_NEWSDATA_API_KEY}&category=business&language=en`);
  const data = await res.json();
  return data.results || []; // Assuming the API returns results in a 'results' array
});

const newsSlice = createSlice({
  name: 'news',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => { state.loading = true; })
      .addCase(fetchNews.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
      .addCase(fetchNews.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export default newsSlice.reducer;