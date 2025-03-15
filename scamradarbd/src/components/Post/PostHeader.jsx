import React from "react";
import { format } from "date-fns";

const PostHeader= ({ user, created_at, place }) => {
  return (
    <div className="grid grid-cols-6 md:grid-cols-8 mb-3">
      <div className="col-span-1">
        <img
          className="rounded-full h-15 w-15"
          src="/profile.png"
          alt="profile"
        />
      </div>
      <div className="col-span-5 md:col-span-7 flex flex-col">
        <div className="font-bold">{user}</div>
        <div className="font-thin mb-3">{format(new Date(created_at), "PPpp")}</div>
        <div className="p-2 w-1/2 rounded-[5px] bg-purple-500 text-center text-white text-sm font-medium">
          {place}
        </div>
      </div>
    </div>
  );
};

export default PostHeader;