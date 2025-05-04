import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listProduct: [],
  totalProduct: 0,
  product: undefined,
  imageUploadUrl: null as any,
  error: null,
  updateSuccess: false,
  mainImage: null as string | null,
  detailImages: [] as string[],
};

const apiSearchProduct = "/api/search-product";
const apiCreateProduct = "/api/create-product";

export const searchProduct = createAsyncThunk(
  "product/searchEmployee",
  async ({ query, bodyRep }: any) => {
    const requestUrl = `${apiSearchProduct}?${query}`;
    const response = await axios.post<any>(requestUrl, bodyRep);
    return response;
  }
);

export const createProduct = createAsyncThunk(
  "product/createEmployee",
  async (body: any) => {
    const response = await axios.post<any>(apiCreateProduct, body);
    return response;
  }
);

export const uploadImage = createAsyncThunk(
  "product/uploadImage",
  async (formData: FormData) => {
    const response = await axios.post("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
);

export const getImage = createAsyncThunk(
  "product/getImage",
  async (imagePath: string) => {
    const response = await axios.get(`/api/get-image?imagePath=${imagePath}`, {
      responseType: "blob",
    });

    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(response.data);
    });
  }
);

export const getMultipleImages = createAsyncThunk(
  "product/getMultipleImages",
  async (imagePaths: string[]) => {
    const promises = imagePaths.map((path) =>
      axios
        .get(`/api/get-image?imagePath=${path}`, {
          responseType: "blob",
        })
        .then((response) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(response.data);
          });
        })
    );
    return await Promise.all(promises);
  }
);

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    resetState: (state) => {
      state.mainImage = null;
      state.detailImages = [];
      state.imageUploadUrl = null;
      state.updateSuccess = false;
      state.product = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.listProduct = action.payload.data;
        state.totalProduct = action.payload.headers
          ? parseInt(action.payload.headers["x-total-count"], 10) || 0
          : 0;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.updateSuccess = true;
      })
      .addCase(createProduct.pending, (state, action) => {
        state.updateSuccess = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.updateSuccess = false;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.imageUploadUrl = action.payload;
      })
      .addCase(getImage.fulfilled, (state, action) => {
        state.mainImage = action.payload;
      })
      .addCase(getMultipleImages.fulfilled, (state, action) => {
        state.detailImages = action.payload;
      });
  },
});

export const { resetState } = productReducer.actions;

export default productReducer.reducer;
