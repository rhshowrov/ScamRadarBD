import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api/api"
export const getAnalyzedData=createAsyncThunk('api/getAnalyzedData',
    async(_,{rejectWithValue})=>{
        try{
            const res=await api.get('api/post/get_analyzed_data/')
            return res.data

        }catch(error){
            if(!error.response){
                rejectWithValue("Check Server Status!")
            }
            console.log(error.response)
            return rejectWithValue('Error happend!')
        }
    }
)



const initialState={
    results:[],
    status:null,
    error:null,
    loading:false,
}

const analyzedDataSlice=createSlice({
    name:'analyzedData',
    initialState:initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
              .addCase(getAnalyzedData.fulfilled,(state,action)=>{
                state.results=action.payload
                state.error=null
                state.loading=false
                state.status='Successfully Obtain the Data'
              })
              .addCase(getAnalyzedData.pending,(state)=>{
                state.loading=true
                state.status='Pending...'
              })
              .addCase(getAnalyzedData.rejected,(state,action)=>{
                state.error="Something Wrong!!"
                state.loading=false
                state.status=action.payload.error
              })
    }

})

export const analyzedDataSliceActions=analyzedDataSlice.actions
export default analyzedDataSlice;