import { useEffect, useState } from "react";
import type { Post } from "../pages/HomePage";
import { getDateDifference } from "../utils/utils";
import { ThumbsUp, MessageCircle, Forward, SendHorizonal } from "lucide-react";
import CommentComponent from "./CommentComponent";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
interface PostProps {
  post: Post;
}
const PostComponent: React.FC<PostProps> = ({ post }) => {
  const { token, currentUser } = useAuth();
  const [commentToBeAdded, setCommentToBeAdded] = useState("");
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [likes, setLikes] = useState<[]>(post.likes);
  const [comments, setComments] = useState<[]>(post.comments);
  const navigate = useNavigate();
  const data = {
    postId: post._id,
    userId: currentUser?._id,
  };

  useEffect(() => {
    const isLiked = post.likes.some((like) => like["_id"] == data.userId);
    setIsPostLiked(isLiked);
  }, []);

  const likePost = async () => {
    await fetch("http://localhost:3000/api/post/like", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        setIsPostLiked(!isPostLiked);
        setLikes(response);
      })
      .catch((err) => console.error(err));
  };
  const makeComment = async () => {
    await fetch("http://localhost:3000/api/post/comment", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: data.postId,
        userId: data.userId,
        comment: commentToBeAdded,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setComments(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!commentToBeAdded) return;

    makeComment();
    setCommentToBeAdded("");
  };
  return (
    <div className="w-full border-1 border-gray-300 bg-white shadow p-4 mb-2 select-none">
      <div className="flex flex-row mb-2">
        <img
          className="size-12 object-cover rounded-full hover:cursor-pointer"
          src={`http://localhost:3000/${post.user.imgUrl}`}
          onClick={() => {
            navigate(`profile/${post.user._id}`);
          }}
        />
        <div className="flex flex-row justify-between w-full text-l text-gray-700 font-medium ml-2">
          <a
            href={`/profile/${post.user._id}`}
            className="hover:cursor-pointer"
          >
            {post.user.username}
          </a>
          <p className="text-sm font-light">{getDateDifference(post.date)}</p>
        </div>
      </div>
      <div>
        <p className="text-left pb-2">{post.description}</p>
        <div>
          {post.imgUrl && (
            <img
              className="max-h-200"
              src={`http://localhost:3000/${post.imgUrl}`}
            />
          )}

          <div className="flex flex-row items-center mt-1 space-x-1 border-b-1 border-gray-300">
            {likes.length > 0 && (
              <div className="flex flex-row items-center space-x-1 text-gray-600">
                <ThumbsUp className="size-7 p-1" />
                <p>{likes.length}</p>
              </div>
            )}
            <div className="h-7">
              {comments.length > 0 && (
                <div className="flex flex-row items-center space-x-1 text-gray-600">
                  <MessageCircle className="size-7 p-1" />
                  <p>{comments.length}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row space-x-3 mt-3 text-gray-500">
            <div
              onClick={likePost}
              className={`flex flex-row hover:cursor-pointer ${
                isPostLiked ? `text-blue-500` : ``
              } hover:text-blue-300 active:opacity-60 transition-colors duration-75`}
            >
              <ThumbsUp />
              <p className="pl-1 pt-0.5 select-none">Like</p>
            </div>
            <div className="flex flex-row hover:cursor-pointer hover:text-blue-300 active:opacity-60 transition-colors duration-75 ">
              <MessageCircle />
              <p className="pl-1 pt-0.5 select-none">Comment</p>
            </div>
            <div className="flex flex-row hover:cursor-pointer hover:text-blue-300 active:opacity-60 transition-colors duration-75">
              <Forward />
              <p className="pl-1 pt-0.5 select-none">Share</p>
            </div>
          </div>
          <div className="flex flex-row pt-4">
            <img
              className="size-10 object-cover rounded-full"
              src={`http://localhost:3000/${currentUser?.imgUrl}`}
            />
            <form
              onSubmit={handleCommentSubmit}
              className="flex items-center w-full border border-gray-400 rounded-3xl ml-1 text-left pl-3"
            >
              <input
                type="text"
                value={commentToBeAdded}
                onChange={(e) => setCommentToBeAdded(e.target.value)}
                placeholder="Comment here"
                className="text-left flex-1 outline-none"
              />
              <button
                type="submit"
                className="mr-1 text-gray-500 hover:bg-blue-200 rounded-full p-1 transition-all duration-75"
              >
                <SendHorizonal />
              </button>
            </form>
          </div>
          {comments
            .slice()
            .reverse()
            .map((comment, key) => (
              <CommentComponent key={key} comment={comment} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default PostComponent;
