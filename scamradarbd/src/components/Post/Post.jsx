import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { useEffect } from "react";
import { postList } from "../../store/postSlice";

const Post = () => {
  const { posts, loading, error } = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postList());
  }, [dispatch]);
  return (
    <div className="flex flex-col ">
      {/* 🔄 Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* ❌ Error State */}
      {error && (
        <div className="alert alert-error w-full max-w-md text-white">
          <span>❌ {error}</span>
        </div>
      )}

      {/* 📜 Post List */}
      {!loading && !error && posts.length > 0 && (
        <div className="w-full max-w-3xl rounded flex flex-col gap-2 mt-2">
          {posts.map((post) => (
            <PostCard className="w-auto" key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* 🚫 No Posts Available */}
      {!loading && !error && posts.length === 0 && (
        <div className="alert alert-info w-full max-w-md">
          <span>⚠️ No posts available</span>
        </div>
      )}
    </div>
  );
};

export default Post;
