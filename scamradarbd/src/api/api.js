import axios from "axios";
import { ACCESS_TOKEN } from "./constant";
import store from "../store/store";
import { authSliceActions } from "../store/authSlice";


const api=axios.create({
    baseURL: 'http://127.0.0.1:8000/'
  });


api.interceptors.request.use(
    (config) =>{
        const token=localStorage.getItem(ACCESS_TOKEN)
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config

    },
    (error)=>{
        return Promise.reject(error)

    }
);
// ✅ Response Interceptor: Handle Token Expiration
api.interceptors.response.use(
    (response) => response, // If the response is successful, return it.
    (error) => {
      if (error.response && error.response.status === 401) {
        console.warn("Token expired. Logging out...");
        store.dispatch(authSliceActions.logOut()); // Dispatch logout action
      }
      return Promise.reject(error);
    }
  );


export default api