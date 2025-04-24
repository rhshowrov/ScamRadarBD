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
    formData.forEach((value, key) => {
      console.log(`Form key=${key} and value is=${value}`);
    });
    const res=await api.patch('api/user/profile/',formData)
    return res.data
  }catch(error){
    if (!error.response){
      return rejectWithValue("Check Server Status")
    }
    console.log(error.response.data)
    return rejectWithValue(error.response.data)
  }
})


const initialState={
    user:{},
    error:null,
    messegae:null,
    loading:true,
}

const profileSlice=createSlice({
    name:'profile',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
              .addCase(getProfile.fulfilled,(state,actions)=>{
                state.loading=false
                state.user=actions.payload
                state.messegae='Succesfully get the Data'
                state.error=null

              })
              .addCase(getProfile.pending,(state)=>{
                state.loading=true
                state.messegae='getting Profile Data'
                state.error=null
              }
            ) .addCase(getProfile.rejected,(state,actions)=>{
                state.loading=false
                state.messegae="Couldn't retrive Profile Data"
                state.error=actions.payload
              }
            )
            .addCase(updateProfile.fulfilled,(state,actions)=>{
              state.loading=false
              state.user=actions.payload
              state.messegae='Succesfully get the Data'
              state.error=null

            })
            .addCase(updateProfile.pending,(state)=>{
              state.loading=true
              state.messegae='getting Profile Data'
              state.error=null
            }
          ) .addCase(updateProfile.rejected,(state,actions)=>{
              state.loading=false
              state.user=actions.payload
              state.messegae="Profile update failed!"
              state.error="error occured!"
            }
          )


}})
export const profileSliceActions=profileSlice.actions
export default profileSlice