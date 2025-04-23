import { Link, NavLink, Outlet } from "react-router-dom";

const ProfileBase = () => {
  const activeClassName =
    "text-blue-600 h-7 font-bold bg-base-200  border-r pl-2 border-b-4 border-t-0 border-r-3 z-30 border-blue-600";
  const nonActiveClassName =
    "text-white border-r pl-2 border-b-1 bg-base-200 border-r-1  hover:border-blue-600";
  return (
    <div>
      <h2 className="text-xl  border font-bold p-1 text-sky-400/100 bg-base-200 text-center rounded-md mt-2">
        User Profile{" "}
      </h2>

      <div className="flex flex-row gap-2   w-full ">
        <NavLink
          to="info"
          className={({ isActive }) =>
            isActive ? activeClassName : nonActiveClassName
          }
        >
          <span className="pr-2  ">Info</span>
        </NavLink>
        <NavLink
          to="update"
          className={({ isActive }) =>
            isActive ? activeClassName : nonActiveClassName
          }
        >
          <span className="pr-2">Update Profile </span>
        </NavLink>
        <NavLink
          to="change_password"
          className={({ isActive }) =>
            isActive ? activeClassName : nonActiveClassName
          }
        >
          <span className="pr-2">Change Password </span>
        </NavLink>
        
      </div>
      <Outlet />
    </div>
  );
};
export default ProfileBase;
