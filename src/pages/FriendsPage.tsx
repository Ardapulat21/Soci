import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import type { User } from "./HomePage";
import { UserPlus, Users } from "lucide-react";

const FriendsPage: React.FC = () => {
  const { token, currentUser } = useAuth();
  const [allFriends, setAllFriends] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setAllFriends(response);
      });
    fetch("http://localhost:3000/api/user/fetchFriends", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setFriends(response);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const navigateToProfile = () => {
    alert("navigating to users profile");
  };
  return (
    <div className="pt-10 h-screen font-light flex flex-col items-center select-none">
      <div className="flex flex-row space-x-10">
        <div>
          <div className="flex flex-row space-x-2 items-center justify-center pl-1 pb-1">
            <Users className="size-4" />
            <p className="text-left text-sm">Your Friends</p>
          </div>
          <div className="flex flex-col justify-center items-center min-w-60">
            {friends.map((profile, key) => (
              <div
                key={key}
                className="flex flex-row items-center justify-between px-4 py-2 border-b border-gray-100 bg-white hover:bg-gray-100"
              >
                <div className="flex flex-row justify-center space-x-2 items-center">
                  <img
                    className="rounded-full size-12 "
                    src={`http://localhost:3000/${profile.imgUrl}`}
                  />
                  <p
                    className="font-light hover:cursor-pointer"
                    onClick={() => {
                      navigateToProfile();
                    }}
                  >
                    {profile.username}
                  </p>
                </div>
                <div className="pl-45 ">
                  <UserPlus
                    className="p-1 mx-auto hover:cursor-pointer hover:bg-gray-300 rounded-full"
                    onClick={() => {
                      alert("Frinds added");
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex flex-row space-x-2 items-center justify-center pl-1 pb-1">
            <Users className="size-4" />
            <p className="text-sm">All Friends</p>
          </div>
          <div className="flex flex-col justify-center items-center ">
            {allFriends
              .filter((friend) => friend._id !== currentUser?._id)
              .map((profile) => (
                <div className="flex flex-row items-center justify-between px-4 py-2 border-b border-gray-100 bg-white hover:bg-gray-100 w-100">
                  <div className="flex flex-row justify-center space-x-2 items-center">
                    <img
                      className="rounded-full size-12 "
                      src={`http://localhost:3000/${profile.imgUrl}`}
                    />
                    <p
                      className="font-light hover:cursor-pointer"
                      onClick={() => {
                        navigateToProfile();
                      }}
                    >
                      {profile.username}
                    </p>
                  </div>
                  <div className="pl-45 ">
                    <UserPlus
                      className="p-1 mx-auto hover:cursor-pointer hover:bg-gray-300 rounded-full"
                      onClick={() => {
                        alert("Frinds added");
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
