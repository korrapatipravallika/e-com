import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProductsAPI } from "./productAPI";

const priceRanges = [
  { id: "1-1000", min: 1, max: 1000, label: "1 to 1000" },
  { id: "1000-10000", min: 1000, max: 10000, label: "1000 to 10000" },
  { id: "10000-20000", min: 10000, max: 20000, label: "10000 to 20000" },
  { id: "20000-plus", min: 20000, max: Number.POSITIVE_INFINITY, label: "20000 and above" },
];

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllProductsAPI();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ?? "Unable to fetch products."
      );
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
  currentPage: 1,
  itemsPerPage: 10,
  searchTerm: "",
  selectedCategory: "all",
  selectedBrand: "all",
  selectedPriceRanges: [],
  minPrice: "",
  maxPrice: "",
  minRating: "",
  stockFilter: "all",
  availablePriceRanges: priceRanges,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = Number(action.payload);
      state.currentPage = 1;
    },
    togglePriceRange: (state, action) => {
      const rangeId = action.payload;

      if (state.selectedPriceRanges.includes(rangeId)) {
        state.selectedPriceRanges = state.selectedPriceRanges.filter(
          (item) => item !== rangeId
        );
      } else {
        state.selectedPriceRanges.push(rangeId);
      }

      state.currentPage = 1;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    },
    setBrand: (state, action) => {
      state.selectedBrand = action.payload;
      state.currentPage = 1;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
      state.currentPage = 1;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
      state.currentPage = 1;
    },
    setMinRating: (state, action) => {
      state.minRating = action.payload;
      state.currentPage = 1;
    },
    setStockFilter: (state, action) => {
      state.stockFilter = action.payload;
      state.currentPage = 1;
    },
    clearFilters: (state) => {
      state.selectedCategory = "all";
      state.selectedBrand = "all";
      state.selectedPriceRanges = [];
      state.minPrice = "";
      state.maxPrice = "";
      state.minRating = "";
      state.stockFilter = "all";
      state.searchTerm = "";
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unable to fetch products.";
      });
  },
});

export const {
  clearFilters,
  setBrand,
  setCategory,
  setCurrentPage,
  setItemsPerPage,
  setMaxPrice,
  setMinPrice,
  setMinRating,
  setSearchTerm,
  setStockFilter,
  togglePriceRange,
} = productSlice.actions;

export default productSlice.reducer;
