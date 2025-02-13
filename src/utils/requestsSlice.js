import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: 'requests',
    initialState: null,
    reducers: {
        setRequests: (state, action) => action.payload,
        // removeRequests: () => null
    }
});

export const { setRequests } = requestsSlice.actions;
export default requestsSlice.reducer;