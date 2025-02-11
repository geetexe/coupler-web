import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import loaderReducer from './loaderSlice';
import connectionsReducer from './connectionsSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        loader: loaderReducer,
        connections: connectionsReducer
    }
})

export default appStore;