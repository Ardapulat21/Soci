import type { Comment } from "../pages/HomePage";

interface CommentProps {
  comment: Comment;
}

const CommentComponent: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex flex-row pt-2 pb-1 shadow-2xs border-gray-300 select-none">
      <div className="flex flex-row justify-center items-center">
        <img
          className="size-10 rounded-full"
          src={`http://localhost:3000/${comment.user.imgUrl}`}
        />
      </div>
      <div className="flex flex-col text-gray-700 pl-2 space-y-0">
        <p className="font-semibold text-start">{comment.user.username}</p>
        <p> {comment.comment}</p>
      </div>
    </div>
  );
};

export default CommentComponent;
