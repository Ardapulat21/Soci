import { Check, X } from "lucide-react";
import type { User } from "../pages/HomePage";
import { useEffect, useRef } from "react";

interface NotificationTabProps {
  user: User | null;
  text: string;
  isFriendshipInvite?: boolean;
  onClose: () => void;
}
const NotificationTab: React.FC<NotificationTabProps> = ({
  user,
  text,
  isFriendshipInvite,
  onClose,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!popupRef.current?.contains(e.target)) {
        console.log("dcc");
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
        className="absolute flex flex-col top-10 right-15 border-1 min-w-70 border-gray-300 bg-white text-gray-600"
      >
        <p className="text-left pl-3">Notifications</p>
        <div className="flex flex-row space-x-2 justify-between items-center py-3 px-3">
          <div className="flex flex-row space-x-2 items-center">
            <img
              className="rounded-full size-10"
              src={`http://localhost:3000/${user?.imgUrl}`}
            />
            <p>{text}</p>
          </div>
          {isFriendshipInvite && (
            <div className="flex flex-row space-x-2">
              <X className="m-1 rounded-full hover:bg-gray-300" />
              <Check className="rounded-full m-1 hover:bg-gray-300" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationTab;
