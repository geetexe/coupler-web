import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import loaderReducer from './loaderSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        loader: loaderReducer
    }
})

export default appStore;