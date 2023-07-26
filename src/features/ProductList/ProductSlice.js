import { createAction, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByFilters,
  fetchAllBrands,
  fetchAllCategories,
  fetchProductById,
  addProduct,
  updateProduct,
  updateCategory,
  updateBrand,
} from "./ProductAPI";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProductsAsync",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFiltersAsync",
  async (filter) => {
    const response = await fetchProductsByFilters(filter);
    return response;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  "product/fetchAllCategories",
  async () => {
    const response = await fetchAllCategories();
    return response;
  }
);
export const fetchAllBrandsAsync = createAsyncThunk(
  "product/fetchAllBrands",
  async () => {
    const response = await fetchAllBrands();
    return response;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response;
  }
);

export const addProductAsync = createAsyncThunk(
  "product/addProduct",
  async (product) => {
    const response = await addProduct(product);
    return response;
  }
);
export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await updateProduct(product);
    return response;
  }
);
export const updateCategoryAsync = createAsyncThunk(
  "product/updateCategory",
  async (category) => {
    const response = await updateCategory(category);
    return response;
  }
);
export const updateBrandAsync = createAsyncThunk(
  "product/updateBrand",
  async (brand) => {
    const response = await updateBrand(brand);
    return response;
  }
);



export const productSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.data;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.data;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload.data;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload.data;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload.data;
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload.data);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (id) => id.id === action.payload.id
        );
        state.products[index] = action.payload.data;
        state.selectedProduct = action.payload.data;
      })
      .addCase(updateCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.categories.findIndex(
          (id) => id.id === action.payload.id
        );
        state.categories[index] = action.payload.data;
      })
      .addCase(updateBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.brands.findIndex(
          (id) => id.id === action.payload.id
        );
        state.brands[index] = action.payload.data;
      })
  },
});

export const {clearSelectedProduct, checkCategory} = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const totalProducts = (state) => state.product.totalItems;
export const selectAllCategories = (state) => state.product.categories;
export const selectAllBrands = (state) => state.product.brands;
export const selectedProduct = (state) => state.product.selectedProduct;
export const selectProductStatus = (state) => state.product.status;

export default productSlice.reducer;
