import { ThumbsUp, MessageCircle, Forward, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { getDateDifference } from "../utils/utils";

interface User {
  id: number;
  name: string;
  surname: string;
  avatarUrl: string;
}
interface Post {
  id: number;
  user: User;
  description: string;
  imgUrl?: string;
  likeCount: number;
  likes: User[];
  commentCount: number;
  comments: Comment[];
  date: Date;
}
interface Comment {
  id: number;
  user: User;
  comment: string;
}

const Contents = () => {
  const user: User = {
    id: 1,
    name: "Arda",
    surname: "Pulat",
    avatarUrl: "Arda Pulat.jpeg",
  };
  const posts: Post[] = [
    {
      id: 1,
      user: user,
      description: "Hey",
      imgUrl: "hapinnes.png",
      likeCount: 3,
      likes: [
        {
          id: 1,
          name: "Arda",
          surname: "Pulat",
          avatarUrl: "Arda Pulat.jpeg",
        },
        {
          id: 1,
          name: "Arda",
          surname: "Pulat",
          avatarUrl: "Arda Pulat.jpeg",
        },
        {
          id: 1,
          name: "Arda",
          surname: "Pulat",
          avatarUrl: "Arda Pulat.jpeg",
        },
      ],
      commentCount: 1,
      comments: [
        {
          id: 1,
          user: user,
          comment: "hey its comment",
        },
        {
          id: 1,
          user: user,
          comment: "hey its comment",
        },
        {
          id: 1,
          user: user,
          comment: "hey its comment",
        },
      ],
      date: new Date("10/02/2024"),
    },
    {
      id: 1,
      user: user,
      description: "Hey",
      imgUrl: "hapinnes.png",
      likeCount: 3,
      likes: [
        {
          id: 1,
          name: "Arda",
          surname: "Pulat",
          avatarUrl: "Arda Pulat.jpeg",
        },
        {
          id: 1,
          name: "Arda",
          surname: "Pulat",
          avatarUrl: "Arda Pulat.jpeg",
        },
        {
          id: 1,
          name: "Arda",
          surname: "Pulat",
          avatarUrl: "Arda Pulat.jpeg",
        },
      ],
      commentCount: 1,
      comments: [
        {
          id: 1,
          user: user,
          comment: "hey its comment",
        },
        {
          id: 1,
          user: user,
          comment: "hey its comment",
        },
        {
          id: 1,
          user: user,
          comment: "hey its comment",
        },
      ],
      date: new Date("10/02/2024"),
    },
    {
      id: 1,
      user: user,
      description: "Hey",
      imgUrl: "hapinnes.png",
      likeCount: 3,
      likes: [
        {
          id: 1,
          name: "Arda",
          surname: "Pulat",
          avatarUrl: "Arda Pulat.jpeg",
        },
        {
          id: 1,
          name: "Arda",
          surname: "Pulat",
          avatarUrl: "Arda Pulat.jpeg",
        },
        {
          id: 1,
          name: "Arda",
          surname: "Pulat",
          avatarUrl: "Arda Pulat.jpeg",
        },
      ],
      commentCount: 1,
      comments: [
        {
          id: 1,
          user: user,
          comment: "hey its comment",
        },
        {
          id: 1,
          user: user,
          comment: "hey its comment",
        },
        {
          id: 1,
          user: user,
          comment: "hey its comment",
        },
      ],
      date: new Date("10/02/2024"),
    },
    {
      id: 1,
      user: user,
      description: "Hey",
      imgUrl: "hapinnes.png",
      likeCount: 3,
      likes: [
        {
          id: 1,
          name: "Arda",
          surname: "Pulat",
          avatarUrl: "Arda Pulat.jpeg",
        },
        {
          id: 1,
          name: "Arda",
          surname: "Pulat",
          avatarUrl: "Arda Pulat.jpeg",
        },
        {
          id: 1,
          name: "Arda",
          surname: "Pulat",
          avatarUrl: "Arda Pulat.jpeg",
        },
      ],
      commentCount: 1,
      comments: [
        {
          id: 1,
          user: user,
          comment: "hey its comment",
        },
        {
          id: 1,
          user: user,
          comment: "hey its comment",
        },
        {
          id: 1,
          user: user,
          comment: "hey its comment",
        },
      ],
      date: new Date("10/02/2024"),
    },
  ];
  const [commentToBeAdded, SetCommentToBeAdded] = useState("");

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!commentToBeAdded) return;

    alert(commentToBeAdded);
    SetCommentToBeAdded("");
  };

  return (
    <div className="pt-10 bg-gray-50 min-h-screen w-100 mx-auto">
      {posts.map((post) => (
        <div className="w-full border-1 border-gray-300 shadow p-4 mb-2">
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
                {getDateDifference(post.date)}
              </p>
            </div>
          </div>
          <div>
            <p className="text-left pb-2">{post.description}</p>
            {post.imgUrl && (
              <div>
                <img className="max-h-200" src={post.imgUrl} />
                <div className="flex flex-row space-x-3 pt-3">
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
                    src={user.avatarUrl}
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
                      className="mr-1 hover:bg-blue-200 rounded-full p-1 transition-all duration-75"
                    >
                      <SendHorizonal />
                    </button>
                  </form>
                </div>
                {post.comments.map((comment) => (
                  <div className="flex flex-row pt-2 pb-1 shadow-2xs border-gray-300">
                    <img
                      className="size-10 rounded-full"
                      src={comment.user.avatarUrl}
                    />
                    <p className="flex flex-col justify-center text-gray-700 pl-2">
                      {comment.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Contents;
