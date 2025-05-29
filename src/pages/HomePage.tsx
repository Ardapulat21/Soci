import { useEffect, useState } from "react";
import Post from "../components/PostComponent";
import { Plus } from "lucide-react";
import PostCreationComponent from "../components/PostCreationComponent";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export interface Post {
  _id: string;
  user: User;
  description: string;
  imgUrl?: string;
  likes: [];
  comments: [];
  date: string;
}
export interface Comment {
  _id: string;
  user: User;
  comment: string;
}
export interface User {
  _id: string;
  username: string;
  imgUrl: string;
  friends?: User[];
  pendingRequests?: User[];
  invitedUsers?: User[];
  notifications?: [
    {
      user: User;
      notification: string;
    }
  ];
}

const HomePage: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [homePosts, setHomePosts] = useState<Post[]>([]);
  const [isPostCreationWindowOpen, setIsPostCreationWindowOpen] =
    useState(false);
  const [isExploreMode, setIsExploreMode] = useState(false);
  const updateContents = (newPost: Post) => {
    const updatedPost = [newPost, ...allPosts];
    setAllPosts(updatedPost);
  };

  useEffect(() => {
    const fetchAllPost = async () => {
      fetch("http://localhost:3000/api/post/fetchExplorePosts", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            logout();
            navigate("/auth");
            throw new Error("Authentication is failed " + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          data.reverse();
          setAllPosts(data);
        })
        .catch((err) => console.error(err));
    };
    const fetchHomepagePosts = async () => {
      fetch("http://localhost:3000/api/post/fetchHomepagePosts", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            logout();
            navigate("/auth");
            throw new Error("Authentication is failed " + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          data.reverse();
          setHomePosts(data);
        })
        .catch((err) => console.error(err));
    };
    fetchAllPost();
    fetchHomepagePosts();
  }, []);
  return (
    <div className="pt-10 min-h-screen w-100 mx-auto">
      <div></div>
      <div className="flex flex-row justify-between w-full py-3 ">
        <button
          className="flex flex-row ml-2 border border-gray-300 bg-white py-1 px-2 rounded-full text-s font-light text-blue-500 hover:cursor-pointer"
          onClick={() => {
            setIsPostCreationWindowOpen(!isPostCreationWindowOpen);
          }}
        >
          <Plus className="" />
          <p>New Post</p>
        </button>
        <div className="flex flex-row">
          <div
            className={`px-3 py-1 rounded-l-2xl border border-gray-300 ${
              isExploreMode ? "bg-white" : "bg-gray-300"
            } font-light select-none hover:cursor-pointer`}
            onClick={() => {
              setIsExploreMode(false);
            }}
          >
            Home
          </div>
          <div
            className={`px-3 py-1 rounded-r-2xl border border-gray-300 ${
              !isExploreMode ? "bg-white" : "bg-gray-300"
            } font-light select-none hover:cursor-pointer`}
            onClick={() => {
              setIsExploreMode(true);
            }}
          >
            Explore
          </div>
        </div>
      </div>
      <div>
        {isExploreMode
          ? allPosts.map((post, key) => <Post key={key} post={post} />)
          : homePosts.map((post, key) => <Post key={key} post={post} />)}
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
