import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: 'loader',
    initialState: false,
    reducers: {
        toggleLoading: (state, action) => action.payload
    }
});

export const {toggleLoading} = loaderSlice.actions;
export default loaderSlice.reducer;