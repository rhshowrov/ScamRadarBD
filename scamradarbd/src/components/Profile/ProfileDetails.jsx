import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../store/profileSlice";

const ProfileDetails = () => {
  const { user, message, error, loading } = useSelector(
    (store) => store.profile
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user || !user.username) {
      dispatch(getProfile());
    }
  }, [user, dispatch]);
  if (loading) {
    <div>loading.......</div>;
  }
  if (error) {
    <div>{error}</div>;
  }
  return (
    <div className="grid grid-row-2 gap-1  mt-2">
      <div className="row-span-1 bg-base-200 rounded-md">
        <div className="grid justify-items-center">
          <img
            className="w-30 h-30 rounded-full my-2 border-2  border-cyan-500"
            src={user.profile_pic}
            alt="User image"
          />
          <div className="text-lg">
            {user.first_name
              ? `${user.first_name} + " " ${user.last_name}`
              : "Full Name Not Found!"}
          </div>
        </div>
      </div>
      <div className="row-span-1 bg-base-200 p-2 mt-1 rounded-md grid grid-cols-6 gap-1  w-full">
        <div className="col-span-3 justify-items-start md:w-1/2 font-bold">
          <div>Username:</div>
          <div>Email:</div>

          <div>First Name:</div>
          <div>Last Name:</div>
          <div>Mobile:</div>
        </div>
        <div className="col-span-3 justify-items-start">
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>{user.first_name ? `${user.first_name}` : "Not Added!"}</div>
          <div>{user.last_name ? `${user.last_name}` : "Not Added!"}</div>
          <div>{user.mobile}</div>
        </div>
      </div>
    </div>
  );
};
export default ProfileDetails;
