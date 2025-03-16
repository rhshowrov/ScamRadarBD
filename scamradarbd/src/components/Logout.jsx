import { useDispatch } from "react-redux";
import { authSliceActions } from "../store/authSlice";
import Login from "./Login";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(authSliceActions.logOut());
  return (
    <>
      <Navigate to="/login"></Navigate>
    </>
  );
};
export default Logout;
