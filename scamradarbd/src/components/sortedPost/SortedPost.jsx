import { useSearchParams } from "react-router-dom";
import api from "../../api/api";
import { useEffect, useState } from "react";
import PostCard from "../Post/PostCard";

const SortedPost = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get type with validation
  const type = searchParams.get("type") || "trending";

  const getSortedPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("api/post/get_sorted_posts/", {
        params: { type },
      });
      setPosts(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch posts");
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSortedPost();
  }, [type]); // Add type as dependency to refetch when it changes

  if (loading) {
    return <div className="text-center py-4">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error}
        <button
          onClick={getSortedPost}
          className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No posts found. Try a different sorting method.
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto rounded flex flex-col gap-4 mt-4">
      <h2 className="text-xl font-semibold">
        Posts sorted by: {type.replace(/_/g, " ")}
      </h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} className="w-full" />
      ))}
    </div>
  );
};

export default SortedPost;
