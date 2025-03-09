import {
  ChatBubbleBottomCenterIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
} from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

const LikeCommentContainer = () => {
  const like = false;
  return (
    <div className="grid grid-row-2 mt-1">
      <div className="row-span-1 flex flex-row justify-between">
        <div className="flex flex-row">
          <HandThumbUpIcon className=" size-7 " />
          <div className="p-1">50 peoples Liked</div>
        </div>
        <div className="flex flex-row">
          <ChatBubbleLeftIcon className=" size-6 " />
          <div className="">
            <Link className="hover:border-b-1">56 Comments</Link>
          </div>
        </div>
      </div>
      <hr />
      <div className="row-span-1 flex flex-row justify-center mb-1 ">
       <div className="hover:border-b-2 ">
        <Link>{like ? <text>You Liked It</text> :<text>Like it if you find this helpful</text>}</Link>
       </div>
      </div>
    </div>
  );
};
export default LikeCommentContainer;
