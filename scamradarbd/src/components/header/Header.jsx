import {
  BellAlertIcon,
  BookmarkIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  PowerIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getNotifications } from "../../store/notificationSlice";

const Header = () => {
  const {unseen}=useSelector(store=>store.notifications.data)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getNotifications())
  },[dispatch])
  return (
    <div className="flex col-span-1 fixed bg-base-200 top-0 left-0 h-screen md:col-span-2 sticky border-r-1 rounded flex-col w-auto">
      <img className="rounded-full border-b-2" src="/logo.png" alt="logo" />
      <div className="flex flex-col items-end mt-5">
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            `size-7 mt-2 mr-2  hover:border ${
              isActive ? "scale-130" : "fill-none text-gray-400"
            }`
          }
        >
          <HomeIcon />
        </NavLink>
        <NavLink
          to="/create-post"
          className={({ isActive }) =>
            `size-7 mt-2 mr-2 hover:border ${
              isActive ? "scale-130" : "fill-none text-gray-400"
            }`
          }
        >
          <PlusCircleIcon />
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `size-7 mt-2 mr-2 hover:border ${
              isActive ? "scale-130" : "fill-none text-gray-400"
            }`
          }
        >
          <MagnifyingGlassIcon />
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `size-7 mt-2 mr-2 hover:border ${
              isActive ? "scale-130" : "fill-none text-gray-400"
            }`
          }
        >
          <UserIcon />
        </NavLink>
        <div className="flex">
          <span className="text-pink-400  font-bold z-0 ">{unseen === 0 ? '' : unseen}</span>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `size-7 mt-2 mr-2 hover:border z-20  ${
                isActive ? "scale-130" : "fill-none text-gray-400"
              }`
            }
          >
            <BellAlertIcon />
          </NavLink>
        </div>
        <NavLink
          to="/bookmarks"
          className={({ isActive }) =>
            `size-7 mt-2 mr-2 hover:border ${
              isActive ? "scale-130" : "fill-none text-gray-400"
            }`
          }
        >
          <BookmarkIcon />
        </NavLink>
        <NavLink
          to="/logout"
          className={({ isActive }) =>
            `size-7 mt-2 mr-2 hover:border ${
              isActive ? "scale-130" : "fill-none text-gray-400"
            }`
          }
        >
          <PowerIcon />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
