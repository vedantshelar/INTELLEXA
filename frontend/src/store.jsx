import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './slices/dataSlice'
import datasetIndexReducer from './slices/datasetIndexSlice';
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    datasetIndex: datasetIndexReducer,
    user: userReducer
  },
})