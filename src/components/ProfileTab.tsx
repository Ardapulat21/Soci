import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthProvider";

interface ProfileTab {
  onClose: () => void;
}
const ProfileTab: React.FC<ProfileTab> = ({ onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);
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
        className="absolute flex flex-col top-10 right-2 border-1 border-gray-300 bg-white text-gray-600"
      >
        <div className="flex flex-row justify-start items-center space-x-3 rounded-xl w-30 py-2 ">
          <img
            className="object-cover rounded-full size-10"
            src={`http://localhost:3000/${currentUser?.imgUrl}`}
          />
          <div className="text-l font-semibold">{currentUser?.username}</div>
        </div>
        <button className="block hover:bg-gray-300 text-left pl-1">
          Profile
        </button>
        <button
          className="text-red-600 hover:bg-gray-300 text-left pl-1"
          onClick={logout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;
