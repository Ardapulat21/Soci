import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import type { User } from "./HomePage";
import { UserPlus, Users } from "lucide-react";
import FriendComponent from "../components/FriendComponent";

const FriendsPage: React.FC = () => {
  const { token, currentUser } = useAuth();
  const [nonFriends, setNonFriends] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, friendsResponse] = await Promise.all([
          fetch("http://localhost:3000/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:3000/api/user/fetchFriends", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const allUsers = await userResponse.json();
        const friendsData = await friendsResponse.json();

        const myFriendIds = new Set(
          friendsData.map((friend: User) => friend._id)
        );
        const nonFriends = allUsers.filter(
          (user: User) => !myFriendIds.has(user._id)
        );
        setNonFriends(nonFriends);
        setFriends(friendsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token, setNonFriends, setFriends]);

  return (
    <div className="pt-10 h-screen font-light flex flex-col items-center select-none">
      <div className="flex flex-row space-x-10">
        <div>
          <div className="flex flex-row space-x-2 items-center justify-center pl-1 pb-1">
            <Users className="size-4" />
            <p className="text-left text-sm">Your Friends</p>
          </div>
          <div className="flex flex-col justify-center items-center min-w-60">
            {friends.map((profile) => (
              <FriendComponent profile={profile} />
            ))}
          </div>
        </div>
        <div>
          <div className="flex flex-row space-x-2 items-center justify-center pl-1 pb-1">
            <Users className="size-4" />
            <p className="text-sm">All Friends</p>
          </div>
          <div className="flex flex-col justify-center items-center ">
            {nonFriends
              .filter((friend) => friend._id !== currentUser?._id)
              .map((profile) => (
                <FriendComponent
                  profile={profile}
                  isInvited={
                    !!profile.pendingRequests?.some(
                      (req) => req._id == currentUser?._id
                    )
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
