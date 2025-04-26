import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api/api"
export const getProfile=createAsyncThunk('user/profile',async(__,{rejectWithValue})=>{
    try{
        const res= await api.get('api/user/profile')
        return res.data
    }catch(error){
        if(!error.response){
            return rejectWithValue('Check Server Status or internet!')

        }    
        return rejectWithValue(error.response.data.error)
    }
})

export const updateProfile=createAsyncThunk('/profile/update',async(formData,{rejectWithValue})=>{
  try{
    const res=await api.patch('api/user/profile/',formData)
    return res.data
  }catch(error){
    if (!error.response){
      return rejectWithValue("Check Server Status")
    }
    return rejectWithValue(error.response.data)
  }
})


const initialState={
    user:{},
    errors:{},
    message:null,
    loading:true,
}

const profileSlice=createSlice({
    name:'profile',
    initialState,
    reducers:{
      clearErrors(state) {
        state.errors = null;
        // state.message = null;
      }

    },
    extraReducers:(builder)=>{
        builder
              .addCase(getProfile.fulfilled,(state,actions)=>{
                state.loading=false
                state.user=actions.payload
                state.message=null

              })
              .addCase(getProfile.pending,(state)=>{
                state.loading=true
                state.message=null
              }
            ) .addCase(getProfile.rejected,(state,actions)=>{
                state.loading=false
                state.message=null
                state.errors=actions.payload
              }
            )
            .addCase(updateProfile.fulfilled,(state,actions)=>{
              state.loading=false
              state.user=actions.payload
              state.message='Profile Update Succesfull!'
              state.errors=null

            })
            .addCase(updateProfile.pending,(state)=>{
              state.loading=true
              state.message=null
              state.errors=null
            }
          ) .addCase(updateProfile.rejected,(state,actions)=>{
              state.loading=false
              state.message=null
              console.log(actions.payload)
              state.errors=actions.payload
            }
          )


}})
export const profileSliceActions=profileSlice.actions
export default profileSlice