import { useEffect, useState } from "react";
import Post from "../components/PostComponent";
import { Plus } from "lucide-react";
import PostCreationComponent from "../components/PostCreationComponent";

export interface Post {
  id: number;
  user: {
    id: Number;
    username: string;
    imgUrl: string;
  };
  description: string;
  imgUrl?: string;
  likes: [];
  comments: Comment[];
  date: string;
}
export interface Comment {
  id: number;
  user: {};
  comment: string;
}

const Contents = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostCreationWindowOpen, setIsPostCreationWindowOpen] =
    useState(false);
  useEffect(() => {
    fetch("http://localhost:3000/api/post")
      .then((response) => response.json())
      .then((data) => {
        data.sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPosts(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="pt-10 min-h-screen w-100 mx-auto">
      <div className="flex flex-row justify-start w-full py-3 ">
        <button
          className="flex flex-row ml-2 border border-gray-300 bg-white py-1 px-2 rounded-full text-s font-light text-blue-500 hover:cursor-pointer"
          onClick={() => {
            setIsPostCreationWindowOpen(!isPostCreationWindowOpen);
          }}
        >
          <Plus className="" />
          <p>New Post</p>
        </button>
      </div>
      <div>
        {posts.map((post, key) => (
          <Post key={key} post={post} />
        ))}
      </div>
      {isPostCreationWindowOpen && (
        <PostCreationComponent
          onClose={() => {
            setIsPostCreationWindowOpen(false);
          }}
        />
      )}
    </div>
  );
};
export default Contents;
