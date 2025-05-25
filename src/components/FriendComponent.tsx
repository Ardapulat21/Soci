import { Check, UserPlus } from "lucide-react";
import type { User } from "../pages/HomePage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

interface FriendProps {
  profile: User;
  isFriend: boolean;
  isInvited?: boolean;
}
const FriendComponent: React.FC<FriendProps> = ({
  profile,
  isFriend,
  isInvited,
}) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isFriendInvited, setIsFriendInvited] = useState(isInvited);
  const invite = () => {
    fetch("http://localhost:3000/api/user/invite", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ toUserId: profile._id }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  return (
    <div className="flex flex-row items-center justify-between px-4 py-2 border-b border-gray-100 bg-white hover:bg-gray-100 w-100">
      <div className="flex flex-row justify-center space-x-2 items-center">
        <img
          className="rounded-full size-12 "
          src={`http://localhost:3000/${profile.imgUrl}`}
        />
        <p
          className="font-light hover:cursor-pointer"
          onClick={() => {
            navigate(`/${profile.username}`);
          }}
        >
          {profile.username}
        </p>
      </div>
      <div className="pl-45 ">
        {!isFriend &&
          (isFriendInvited ? (
            <Check
              className="p-1 mx-auto hover:cursor-pointer hover:bg-gray-300 rounded-full"
              onClick={() => {
                invite();
                setIsFriendInvited(!isFriendInvited);
              }}
            />
          ) : (
            <UserPlus
              className="p-1 mx-auto hover:cursor-pointer hover:bg-gray-300 rounded-full"
              onClick={() => {
                invite();
                setIsFriendInvited(!isFriendInvited);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default FriendComponent;
