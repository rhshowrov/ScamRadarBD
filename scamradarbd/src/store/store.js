import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import placeSlice from "./place";
import postSlice from "./postSlice";

const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        place:placeSlice.reducer,
        post:postSlice.reducer,
    }
})

export default store