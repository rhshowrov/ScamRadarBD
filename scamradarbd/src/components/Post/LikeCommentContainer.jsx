import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../api/api";
import Bookmark from "./Bookmark";
const LikeCommentContainer = ({ id, post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentsCount, setCommentsCount] = useState(0);
  const location = useLocation();
  const current_path = location.pathname;
  const target_path = `/posts/details/${id}`;

  // Fetch like and comment status
  useEffect(() => {
    const getLikeCommentStatus = async () => {
      try {
        const res = await api.get(`api/post/post_votes/${id}`);
        setLiked(res.data.likeStatus);
        setLikeCount(res.data.likes);
        setCommentsCount(res.data.comments);
      } catch (error) {
        console.error("Error fetching likes:", error);
        setError("Error Occurred!!");
      } finally {
        setLoading(false);
      }
    };

    getLikeCommentStatus();
  }, [id]);

  // Handle like/unlike action
  const handleLikeUnlike = async () => {
    try {
      const res = await api.post(`api/post/like_dislike/${id}`); // Use POST for state-changing actions
      setLiked(res.data.likeStatus);
      setLikeCount(res.data.likes);
      setCommentsCount(res.data.comments);
    } catch (error) {
      console.error("Error toggling like:", error);
      setError("Error Occurred!!");
    }
  };

  if (error) {
    return <p>{error}</p>; // Return error message
  }

  if (loading) {
    return <p>Loading...</p>; // Return loading message
  }

  return (
    <div className="grid bg-transparent p-2 grid-row-2 mt-1 mb-1">
      <div className="row-span-1 flex flex-row justify-between">
        {/* Like Section */}
        <div className="flex flex-row items-center">
          <button
            onClick={handleLikeUnlike}
            aria-label={liked ? "Unlike post" : "Like post"}
            className="flex items-center  focus:outline-none"
          >
            {liked ? (
              <SolidHeartIcon className="size-6 text-red-500" /> // Solid icon for liked state
            ) : (
              <OutlineHeartIcon className="size-6" /> // Outline icon for unliked state
            )}
            <div className="p-1">
              {likeCount} {likeCount === 1 ? "person loves" : "people love"}{" "}
              this
            </div>
          </button>
        </div>
        <div>
          <Bookmark id={id} />
        </div>
        {/* Comment Section */}

        <div className="flex flex-row items-center">
          {current_path == target_path ? (
            <div className="flex flex-row">
              <ChatBubbleLeftIcon className="size-6" />
              <div className="px-1">{commentsCount}</div>{" "}
            </div>
          ) : (
            <Link
              to={target_path}
              state={post}
              className="hover:border-b-1 hover:text-blue-600 flex flex-row"
            >
              <ChatBubbleLeftIcon className="size-6" />

              <div className="px-1">{commentsCount}</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikeCommentContainer;
