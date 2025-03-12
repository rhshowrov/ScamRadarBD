import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const getPlace=createAsyncThunk('api/getplace',
    async(__,{rejectWithValue})=>{
        try{
            const res=await api.get('api/post/getplace/')
            console.log(res.data)
            return  res.data
        }catch(error){
            if (!error.response){
                return rejectWithValue('Check Server Status or internet!')
            }
            console.log(error.response.data.error);
            
            return rejectWithValue(error.response.data.error)
        }
    }
)
const initialState={
    places:[],
    status:null,
    error:null,
    loading:false,
}
const placeSlice=createSlice({
    name:'place',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
             .addCase(getPlace.fulfilled,(state,action)=>{
                state.places=action.payload
                state.status=true
                state.loading=false
             })
             .addCase(getPlace.pending,(state)=>{
                state.loading=true
             })
             .addCase(getPlace.rejected,(state,action)=>{
                state.error=action.payload
             })

             }
    }
)
export const placeSliceActions=placeSlice.actions
export default placeSlice;