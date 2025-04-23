import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import placeSlice from "./place";
import postSlice from "./postSlice";
import commentsSlice from "./commentSlice";
import analyzedDataSlice from "./analyzedDataSlice";
import profileSlice from "./profileSlice";


const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        place:placeSlice.reducer,
        posts:postSlice.reducer,
        comments:commentsSlice.reducer,
        analyzedData:analyzedDataSlice.reducer,
        profile:profileSlice.reducer,
    }
})

export default store