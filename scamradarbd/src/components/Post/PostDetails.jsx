import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageContainer from "./ImageContainer";
import TagContainer from "./TagContainer";
import LikeCommentContainer from "./LikeCommentContainer";
import PostHeader from "./PostHeader";
import PostCommentContainer from "./PostCommentContainer";
import LinkContainer from "./LinkContainer";
import LocationContainer from "./LocationContainer";
import api from "../../api/api";

const PostDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const [post, setPost] = useState(location.state || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!post) {
      const getPost = async () => {
        try {
          setLoading(true);
          const res = await api.get(`api/post/get_post/${id}`);
          setPost(res.data);
        } catch (error) {
          console.log(error.response);
        } finally {
          setLoading(false);
        }
      };
      getPost();
    }
  }, [id, post]);

  if (loading || !post) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="grid grid-row-5 drop-shadow-sm bg-base-200 rounded-lg mt-2 mb-2">
      <PostHeader
        user={post.user}
        created_at={post.created_at}
        place={post.place}
      />

      <div className="indicator w-full">
        <span className="indicator-item indicator-center badge badge-success">
          Type: {post.place}
        </span>
        <div className="bg-transparent p-2 flex flex-col">{post.details}</div>
      </div>

      <ImageContainer id={post.id} />
      {post.location && <LocationContainer location={post.location} />}
      {post.tags.length > 0 && <TagContainer tags={post.tags} />}
      {post.link && <LinkContainer link={post.link} />}
      <LikeCommentContainer id={post.id} />
      <PostCommentContainer post_id={post.id} />
    </div>
  );
};

export default PostDetails;
