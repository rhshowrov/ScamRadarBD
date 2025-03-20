import { useLocation } from "react-router-dom";
import ImageContainer from "./ImageContainer";
import TagContainer from "./TagContainer";
import LikeCommentContainer from "./LikeCommentContainer";
import PostHeader from "./PostHeader";
import PostCommentContainer from "./PostCommentContainer";
const PostDetails = () => {
  const location = useLocation();
  const post = location.state;

  return (
    <div className="grid grid-row-5 drop-shadow-sm border rounded-lg mt-2 mb-2">
      {/* Use the UserInfo component */}

      <PostHeader
        user={post.user}
        created_at={post.created_at}
        place={post.place}
      />

      <div className="indicator w-full">
        <span className="indicator-item indicator-center badge badge-success">
          Type:{post.place}
        </span>
        <div className="bg-transparent p-2 flex flex-col">{post.details}</div>
      </div>

      <ImageContainer id={post.id} />
      <TagContainer tags={post.tags} />

      <LikeCommentContainer id={post.id} />
      <PostCommentContainer post_id={post.id} />
    </div>
  );
};
export default PostDetails;
