import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: 'connections', 
    initialState: [],
    reducers: {
        setConnections: (state, action) => action.payload,
        removeConnections: () => null
    }
});

export const {setConnections, removeConnections} = connectionsSlice.actions;
export default connectionsSlice.reducer;