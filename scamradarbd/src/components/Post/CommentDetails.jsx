import React from "react";

const CommentDetials = ({ comment }) => {
  return (
    <div className="grid grid-cols-6 md:grid-cols-8 p-2">
      {/* User Profile Image */}
      <div className="col-span-1 md:col-span-1">
        <img
          className="rounded-full h-12 w-12 md:h-14 md:w-14"
          src="/profile.png" 
          alt="profile"
        />
      </div>

      {/* Comment Content */}
      <div className="col-span-5 border-t border-primary  md:col-span-7 flex flex-col">
        {/* Username */}
        <div className="font-thin">@{comment.user}</div>

        {/* Comment Text */}
        <div>{comment.comment}</div>
      </div>
    </div>
  );
};

export default CommentDetials;