import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_URL;

const getAllBusinessData = createAsyncThunk(
  "getAllBusinessData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${backend_url}/businessData`,
        { withCredentials: true }
      );

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Cloud not fetch business data"
      );
    }
  }
);


const initialState = {
    data : null,
    loading: false,
    error:false
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
  
        // Pending
        .addCase(getAllBusinessData.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
  
        // Fulfilled
        .addCase(getAllBusinessData.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.error = false;
        })
  
        // Rejected
        .addCase(getAllBusinessData.rejected, (state, action) => {
          state.loading = false;
          state.data = null;
          state.error = true;
        });
    }
  })

export {getAllBusinessData}
export default dataSlice.reducer;
