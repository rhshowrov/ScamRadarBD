import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../api/constant";
export const loginUser=createAsyncThunk('api/login',
    async({username,password},{rejectWithValue})=>{
        try{
            const res=await api.post('api/user/signin/',{username,password})
            return  res.data
        }catch(error){
            if (!error.response){
                return rejectWithValue('Check Server Status or internet!')
            }
            return rejectWithValue(error.response.data)
        }
    }
)


export const registerUser=createAsyncThunk('api/signup',
    async({username,email,password,password2,mobile},{rejectWithValue})=>{
        if(password!=password2){
            return rejectWithValue("Password do not match!")
        }
        try{
            const res=await api.post('api/user/signup/',{username,email,password,mobile})
            return  res.data
        }catch(error){
            if (!error.response){
                return rejectWithValue('Check Server Status or internet!')
            }
            return rejectWithValue(error.response.data)
        }
    }
)


const initialState={
    isAuthenticated:null,
    token:null,
    loading:false,
    error:null,
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(loginUser.fulfilled,(state,action)=>{
                localStorage.setItem(ACCESS_TOKEN,action.payload.access)
                localStorage.setItem(REFRESH_TOKEN,action.payload.refresh)
                state.isAuthenticated=true
                state.loading=false
                state.token=action.payload.access

            })
            .addCase(loginUser.pending,(state)=>{
                state.loading=true
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
            })
            .addCase(registerUser.fulfilled,(state)=>{
                localStorage.clear()
                state.loading=false
            })
            .addCase(registerUser.pending,(state)=>{
                state.loading=true
            })
            .addCase(registerUser.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
            })


    }

})
export const authSliceActions=authSlice.actions
export default authSlice