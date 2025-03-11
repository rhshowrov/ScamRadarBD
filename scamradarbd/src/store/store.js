import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import placeSlice from "./place";

const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        place:placeSlice.reducer
    }
})

export default store