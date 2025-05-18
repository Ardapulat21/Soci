import { useEffect, useState } from "react";
import Post from "../components/PostComponent";
import { Plus } from "lucide-react";
import PostCreationComponent from "../components/PostCreationComponent";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export interface Post {
  _id: number;
  user: User;
  description: string;
  imgUrl?: string;
  likes: [];
  comments: [];
  date: string;
}
export interface Comment {
  _id: number;
  user: User;
  comment: string;
}
export interface User {
  _id: number;
  username: string;
  imgUrl: string;
}

const HomePage: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostCreationWindowOpen, setIsPostCreationWindowOpen] =
    useState(false);

  const updateContents = (newPost: Post) => {
    const updatedPost = [newPost, ...posts];
    setPosts(updatedPost);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/post", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          logout();
          navigate("/");
          throw new Error("Authentication is failed " + response.statusText);
        }
        return response.json();
      })
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
          updateContent={updateContents}
        />
      )}
    </div>
  );
};
export default HomePage;
