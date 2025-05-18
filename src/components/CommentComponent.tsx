import type { Comment } from "../pages/HomePage";

interface CommentProps {
  comment: Comment;
}

const CommentComponent: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex flex-row pt-2 pb-1 shadow-2xs border-gray-300 select-none">
      <img
        className="size-10 rounded-full"
        src={`http://localhost:3000/${comment.user.imgUrl}`}
      />
      <p className="flex flex-col justify-center text-gray-700 pl-2">
        {comment.comment}
      </p>
    </div>
  );
};

export default CommentComponent;
