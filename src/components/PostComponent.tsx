import { useState } from "react";
import type { Post } from "../layouts/Contents";
import { getDateDifference } from "../utils/utils";
import { ThumbsUp, MessageCircle, Forward, SendHorizonal } from "lucide-react";
import CommentComponent from "./CommentComponent";
interface PostProps {
  post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => {
  const [commentToBeAdded, SetCommentToBeAdded] = useState("");

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!commentToBeAdded) return;
    alert(commentToBeAdded);
    SetCommentToBeAdded("");
  };
  return (
    <div className="w-full border-1 border-gray-300 bg-white shadow p-4 mb-2">
      <div className="flex flex-row mb-2">
        <img
          className="size-12 object-cover rounded-full "
          src={post.user.avatarUrl}
        />
        <div className="flex flex-row justify-between w-full text-l text-gray-700 font-medium ml-2">
          <p>
            {post.user.name} {post.user.surname}
          </p>
          <p className="text-sm font-light">
            {getDateDifference(new Date(post.date))}
          </p>
        </div>
      </div>
      <div>
        <p className="text-left pb-2">{post.description}</p>
        {post.imgUrl && (
          <div>
            <img className="max-h-200" src={post.imgUrl} />
            <div className="flex flex-row items-center mt-2 space-x-1 border-b-1 border-gray-300">
              {post.likes.length > 0 && (
                <div className="flex flex-row items-center space-x-1 text-gray-600">
                  <ThumbsUp className="size-7 p-1" />
                  <p>{post.likes.length}</p>
                </div>
              )}
              {post.comments.length > 0 && (
                <div className="flex flex-row items-center space-x-1 p-1 text-gray-600">
                  <MessageCircle className="size-7 p-1" />
                  <p>{post.comments.length}</p>
                </div>
              )}
            </div>
            <div className="flex flex-row space-x-3 mt-3 text-gray-500">
              <div className="flex flex-row hover:cursor-pointer hover:text-blue-300 active:opacity-60 transition-colors duration-75 ">
                <ThumbsUp />
                <p className="pl-1 pt-0.5">Like</p>
              </div>
              <div className="flex flex-row hover:cursor-pointer hover:text-blue-300 active:opacity-60 transition-colors duration-75 ">
                <MessageCircle />
                <p className="pl-1 pt-0.5">Comment</p>
              </div>
              <div className="flex flex-row hover:cursor-pointer hover:text-blue-300 active:opacity-60 transition-colors duration-75">
                <Forward />
                <p className="pl-1 pt-0.5">Share</p>
              </div>
            </div>
            <div className="flex flex-row pt-4">
              <img
                className="size-10 object-cover rounded-full"
                src={post.user.avatarUrl}
              />
              <form
                onSubmit={handleCommentSubmit}
                className="flex items-center w-full border border-gray-400 rounded-3xl ml-1 text-left pl-3"
              >
                <input
                  type="text"
                  value={commentToBeAdded}
                  onChange={(e) => SetCommentToBeAdded(e.target.value)}
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
            {post.comments.map((comment) => (
              <CommentComponent comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default PostComponent;
