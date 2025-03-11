import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const getPlace=createAsyncThunk('api/getplace',
    async(__,{rejectWithValue})=>{
        try{
            const res=await api.post('api/post/getplace/')
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
    place:[],
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
             .addCase(getPlace.fullfilled,(state,action)=>{
                state.place=action.payload
                state.status='Successful'
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