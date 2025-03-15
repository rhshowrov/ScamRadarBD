import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const createPost = createAsyncThunk(
    "api/create_post",
    async ( formData , { rejectWithValue }) => {
        console.log("FormData before sending:");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ": ", pair[1]);
        }
      try {
        const res = await api.post("api/post/create_post/", formData);
  
        console.log(res.data);
        return res.data;
      } catch (error) {
        if (!error.response) {
          return rejectWithValue("Check Server Status or Internet!");
        }
        console.log(error.response);
        return rejectWithValue(error.response.data.error);
      }
    }
  );

export const postList=createAsyncThunk('api/getposts',
  async(__,{rejectWithValue})=>{
    try{
      const res=await api.get("api/post/get_posts/")
      console.log(res.data);
      
      return res.data
    }catch(error){
      if (!error.response) {
        return rejectWithValue("Check Server Status or Internet!");
      }
      console.log(error.response);
      return rejectWithValue(error.response.data.error);
    }
    }
  )


const initialState={
    posts:[],
    error:null,
    loading:null,
    success:null,
}

const postSlice=createSlice({
    name:'posts',
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder
            .addCase(createPost.fulfilled,(state,action)=>{
                            state.loading=false
                            state.success='Post Created Sucesfully!!'
                            state.loading=false       
                        })
                        .addCase(createPost.pending,(state)=>{
                            state.loading=true
                        })
                        .addCase(createPost.rejected,(state,action)=>{
                            state.loading=false
                            state.error=action.payload
                        })
                        .addCase(postList.fulfilled,(state,action)=>{
                          state.loading=false
                          state.posts= action.payload   
                      })
                      .addCase(postList.pending,(state)=>{
                          state.loading=true
                      })
                      .addCase(postList.rejected,(state,action)=>{
                          state.loading=false
                          state.error=action.payload
                      })

    }
})
export const postSliceActions=postSlice.actions
export default postSlice;