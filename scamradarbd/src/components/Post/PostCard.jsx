import { Link } from "react-router-dom";
import ImageContainer from "./ImageContainer";
import TagContainer from "./TagContainer";
import LikeCommentContainer from "./LikeCommentContainer";
import PostHeader from "./PostHeader";
import LinkContainer from "./LinkContainer";
import LocationContaier from "./LocationContainer";

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
        <div className="bg-transparent p-2 flex flex-col hover:text-blue-600">
          {/* Display truncated post details */}
          <Link to={`/posts/details/${post.id}`} state={post}>
            {truncatedDetails}{" "}
          </Link>
        </div>
      </div>

      <ImageContainer id={post.id} />
      {post.location && <LocationContaier location={post.location} />}
      {post.tags.length != 0 && <TagContainer tags={post.tags} />}
      {post.link && <LinkContainer link={post.link} />}
      <LikeCommentContainer id={post.id} />
    </div>
  );
};

export default PostCard;
