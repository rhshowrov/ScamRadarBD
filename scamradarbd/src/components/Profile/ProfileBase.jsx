import { Link } from "react-router-dom";

const ProfileBase = () => {
  return (
    <div>
      <h2 className="text-xl   text-sky-400/100 text-center rounded-md mt-2">
        User Profile{" "}
      </h2>

      <div className="flex flex-row w-full mt-1">
        <Link className=" text-white border-r pl-2 hover:border-b-2 hover:border-r-2  hover:">
          <span className="pr-2">Personal Information</span>
        </Link>
        <Link className=" text-white border-r pl-2 hover:border-b-2 hover:border-r-2">
          <span className="pr-2">Change Password </span>
        </Link>
      </div>
    </div>
  );
};
export default ProfileBase;
