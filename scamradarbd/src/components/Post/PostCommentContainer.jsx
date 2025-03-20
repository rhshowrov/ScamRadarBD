import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentsSliceActions, getComments, postComments } from "../../store/commentSlice";
import CommentDetials from "./CommentDetails";

const PostCommentContainer = ({ post_id }) => {
  const { user } = useSelector((store) => store.auth);
  const { comments, loading, posting, error, success } = useSelector((store) => store.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  // Fetch comments when post_id changes
  useEffect(() => {
    dispatch(getComments(post_id));
    return () => {
      dispatch(commentsSliceActions.resetState()); // Reset state on unmount
    };
  }, [post_id, dispatch]);

  // Handle comment submission
  const handleComment = () => {
    if (comment.trim()) {
      dispatch(postComments({ post_id, comment }));
      setComment(""); // Clear the input after posting
    }
  };

  return (
    <div className="flex flex-col">
      {/* Comment Input Section */}
      <div className="grid grid-cols-6 md:grid-cols-8 p-2">
        <div className="col-span-1 md:col-span-1">
          <img
            className="rounded-full h-14 w-14 md:h-15 md:w-15"
            src="/profile.png" // Consider using dynamic src if user profile images are available
            alt="profile"
          />
          <span className="p-2 md:p-3">{user}</span>
        </div>
        <div className="col-span-5 md:col-span-7 flex flex-col">
          <input
            type="text"
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="input w-full input-accent h-12 rounded-4xl"
          />
          <div className="flex justify-end">
            <button
              disabled={!comment.trim() || posting} // Disable if comment is empty or posting is in progress
              onClick={handleComment}
              className="btn mt-2 btn-primary rounded-4xl w-1/3 md:w-1/6"
            >
              {posting ? "Posting..." : "Comment"}
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center p-4 space-x-2">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg text-gray-700">Loading Comments...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center p-2 mt-4 ml-2 mr-2 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* No Comments State */}
      {!loading && comments.length === 0 && (
        <div className="flex items-center p-2 mt-4 ml-2 mr-2 mb-4 bg-transparent border border-blue-400 text-blue-400 font-semibold rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>No Comments Yet. Be the first to comment!</span>
        </div>
      )}

      {/* Comments Count */}
      {!loading && comments.length > 0 && (
        <div className="p-2 text-xl font-bold text-blue-600 mt-4">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </div>
      )}

      {/* Render Comments */}
      {!loading &&
        comments.length > 0 &&
        comments.map((comment) => (
          <CommentDetials key={comment.id} comment={comment} />
        ))}
    </div>
  );
};

export default PostCommentContainer;