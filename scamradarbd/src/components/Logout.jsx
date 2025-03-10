import { useDispatch } from "react-redux"
import  { authSliceActions } from "../store/authSlice"

const Logout=()=>{
    const dispatch=useDispatch()
    dispatch(authSliceActions.Logout())
    return(
        <>
        </>
    )
}
export default Logout;