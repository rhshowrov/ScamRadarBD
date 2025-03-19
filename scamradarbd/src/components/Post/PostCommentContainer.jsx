import { useState } from "react";
import { useSelector } from "react-redux";

const PostCommentContainer = () => {
  const { user } = useSelector((store) => store.auth);
  const [comment, setComment] = useState("");
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-6  md:grid-cols-8 p-2 ">
        <div className="col-span-1 md:col-span-1">
          <img
            className="rounded-full h-14 w-14 md:h-15 md:w-15 "
            src="/profile.png"
            alt="profile"
          />
          <span className="p-2 md:p-3">{user}</span>
        </div>
        <div className="col-span-5 md:col-span-7  flex flex-col">
          <input
            type="text"
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="input w-full input-accent h-12 rounded-4xl"
          />
          <div className="flex justify-end">
            <button
              disabled={!comment}
              className="btn mt-2 btn-primary  rounded-4xl w-1/3 md:w-1/6  "
            >
              Comment
            </button>
          </div>
        </div>
      </div>
      <div className="p-2 text-xl font-bold">6 comments</div>
      <div className="grid grid-cols-6  md:grid-cols-8 p-2 ">
        <div className="col-span-1 md:col-span-1">
          <img
            className="rounded-full h-12 w-12 md:h-14 md:w-14 "
            src="/profile.png"
            alt="profile"
          />
        </div>
        <div className="col-span-5 border-t md:col-span-7 flex flex-col">
          <div className="font-thin">@rakib</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            ullam asperiores debitis vitae, voluptate sequi in laborum
            reprehenderit temporibus? Unde accusamus assumenda aliquid fuga
            ullam in cum at quae dolorum.
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostCommentContainer;
