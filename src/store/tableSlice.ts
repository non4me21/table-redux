import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TableState {
  filters: {[key: string]: string};
  data: any[];
}

const initialState: TableState = {
  filters: {},
  data: []
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{key: string, value: string}>) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      const key  = action.payload;
      delete state.filters[key];
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },

  },
});

export const { setFilter, removeFilter, clearFilters, setData } = tableSlice.actions;

export default tableSlice.reducer;
