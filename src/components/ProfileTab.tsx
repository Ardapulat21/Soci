import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import { LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileTab {
  onClose: () => void;
}
const ProfileTab: React.FC<ProfileTab> = ({ onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!popupRef.current?.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        ref={popupRef}
        className="absolute flex flex-col top-10 right-2 border-1 min-w-50 border-blue-300 bg-white text-gray-600"
      >
        <div className="flex flex-row justify-start items-center space-x-3 rounded-xl w-30 py-2 px-2 ">
          <img
            className="object-cover rounded-full size-10"
            src={`http://localhost:3000/${currentUser?.imgUrl}`}
          />
          <div className="text-l font-semibold">{currentUser?.username}</div>
        </div>
        <button
          className="flex flex-row text-left pl-2 py-2 items-center hover:bg-gray-100 hover:cursor-pointer"
          onClick={() => {
            navigate("/Profile");
          }}
        >
          <UserRound className="size-5 text-blue-400 border rounded-full mr-1" />
          <p>Profile</p>
        </button>
        <button
          className="flex flex-row text-left text-red-500 pl-2 py-2 items-center hover:bg-gray-100 hover:cursor-pointer"
          onClick={logout}
        >
          <LogOut className="size-5 mr-1" />
          <p>Log out</p>
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;
