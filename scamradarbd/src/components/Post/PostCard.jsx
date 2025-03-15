import { Link } from "react-router-dom";
import ImageContainer from "./ImageContainer";
import TagContainer from "./TagContainer";
import LikeCommentContainer from "./LikeCommentContainer";
import PostHeader from "./PostHeader";

const PostCard = ({ post }) => {
  // Truncate the post details to 200 characters
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const truncatedDetails = truncateText(post.details, 200);

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
        {truncatedDetails}
        {/* Link to the full post details */}
        <Link className="text-end text-primary" to={`/posts/${post.id}`}> See Details....</Link>
      </div>
      <ImageContainer />
      <TagContainer tags={post.tags} />
      <hr />
      <LikeCommentContainer />
    </div>
  );
};

export default PostCard;
