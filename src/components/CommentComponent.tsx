import type { Comment } from "../layouts/Contents";

interface CommentProps {
  comment: Comment;
}

const CommentComponent: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex flex-row pt-2 pb-1 shadow-2xs border-gray-300">
      <img className="size-10 rounded-full" />
      <p className="flex flex-col justify-center text-gray-700 pl-2">
        {comment.comment}
      </p>
    </div>
  );
};

export default CommentComponent;
