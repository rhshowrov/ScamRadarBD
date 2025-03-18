import { useLocation } from "react-router-dom";
import ImageContainer from "./ImageContainer";
import TagContainer from "./TagContainer";
import LikeCommentContainer from "./LikeCommentContainer";
import PostHeader from "./PostHeader";
const PostDetails = () => {
  const location = useLocation();
  const post = location.state;

  return (
    <div className="grid grid-row-5 rounded bg-base-100 p-2 mt-2 mb-2">
      {/* Use the UserInfo component */}
      <PostHeader
        user={post.user}
        created_at={post.created_at}
        place={post.place}
      />
      <hr />

      <div className="mt-2 mb-2 flex flex-col">
        {/* Display truncated post details */}
        {post.details}
      </div>
      <ImageContainer id={post.id} />
      <TagContainer tags={post.tags} />
      <hr />
      <LikeCommentContainer id={post.id} />
    </div>
  );
};
export default PostDetails;
