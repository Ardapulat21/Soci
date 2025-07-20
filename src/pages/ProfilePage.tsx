import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Post, User } from "./HomePage";
import { useAuth } from "../context/AuthProvider";
import PostComponent from "../components/PostComponent";

const ProfilePage: React.FC = () => {
  const { token } = useAuth();
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchUser = () => {
      fetch("http://144.91.99.115:3001/api/user/fetchUserById", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          setUser(response);
        })
        .catch((err) => console.error(err));
    };
    const fetchPosts = () => {
      fetch("http://144.91.99.115:3001/api/post/fetchProfilePosts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          setPosts(response);
        })
        .catch((err) => console.error(err));
    };
    fetchUser();
    fetchPosts();
  }, []);
  return (
    <div className="flex flex-col pt-10 min-h-screen">
      <div className="mx-10">
        <div className="relative h-35">
          <div className="absolute z-0">
            <img
              className="w-screen object-fit h-30"
              src={
                user?.bannerUrl
                  ? `http://144.91.99.115:3001/${user?.bannerUrl}`
                  : `http://144.91.99.115:3001/uploads/banner.png`
              }
            ></img>
          </div>
          <div className="absolute flex flex-col ml-10 mt-10 justify-start items-start">
            <img
              className="size-30 rounded-full object-fit border border-white"
              src={`http://144.91.99.115:3001/${user?.imgUrl}`}
            />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start pl-18 mt-5 text-2xl font-light">
          <p>{user?.username}</p>
        </div>
        <div className="mx-auto mt-5 mb-20 max-w-180">
          {posts.map((post) => (
            <PostComponent key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
