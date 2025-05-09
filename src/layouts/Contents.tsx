import { useEffect, useState } from "react";
import Post from "../components/PostComponent";
import { Plus } from "lucide-react";
import PostCreationComponent from "../components/PostCreationComponent";

export interface User {
  id: number;
  name: string;
  surname: string;
  avatarUrl: string;
}
export interface Post {
  id: number;
  user: User;
  description: string;
  imgUrl?: string;
  likes: User[];
  comments: Comment[];
  date: Date;
}
export interface Comment {
  id: number;
  user: User;
  comment: string;
}

const Contents = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostCreationWindowOpen, setIsPostCreationWindowOpen] =
    useState(false);
  const updateContents = () => {
    fetch("http://localhost:3000/api/post")
      .then((data) => data.json())
      .then((data) => {
        const sortedData = data.sort(
          (a: Post, b: Post) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        console.log(sortedData);
        setPosts(data);
      })
      .then((error) => console.log(error));
  };
  useEffect(() => {
    updateContents();
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
        {posts.map((post) => (
          <Post post={post} />
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
