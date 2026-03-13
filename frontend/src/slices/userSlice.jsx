import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_URL;

const getUserData = createAsyncThunk(
    "getUserData",
    async (_, thunkAPI) => {
      try {
        const response = await axios.get(
          `${backend_url}/users/userData`,
          { withCredentials: true }
        );
  
        return response.data;
  
      } catch (error) {
        console.log("error : ",error)
        return thunkAPI.rejectWithValue(
          "Cloud not fetch user data"
        );
      }
    }
  );

const initialState = {
    user : null,
    loading: false,
    error:false
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
  
        // Pending
        .addCase(getUserData.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
  
        // Fulfilled
        .addCase(getUserData.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.error = false;
        })
  
        // Rejected
        .addCase(getUserData.rejected, (state, action) => {
          state.loading = false;
          state.user = null;
          state.error = true;
        });
    }
  })

export {getUserData}
export default userSlice.reducer;