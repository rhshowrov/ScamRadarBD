import React from "react";
import { format } from "date-fns";

const PostHeader = ({ user, created_at, place }) => {
  return (
    <div className="grid p-2 bg-transparent grid-cols-6 md:grid-cols-8">
      <div className="col-span-1">
        <img
          className="rounded-full h-15 w-15"
          src="/profile.png"
          alt="profile"
        />
      </div>
      <div className="col-span-5 md:col-span-7 flex flex-col">
        <div className="font-bold">{user}</div>
        <div className="font-thin mb-3">
          {format(new Date(created_at), "PPpp")}
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
