import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    index : 0,
}

export const datasetIndexSlice = createSlice({
    name: 'datasetIndex',
    initialState,
    reducers: {
        updateCurrentDatasetIndex : (state,action)=>{
            state.index = action.payload;
        }
    },
  })

  export const {updateCurrentDatasetIndex} = datasetIndexSlice.actions;
  export default datasetIndexSlice.reducer;
