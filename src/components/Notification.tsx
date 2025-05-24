import { X, Check } from "lucide-react";
import type { User } from "..//pages/HomePage";

interface NotificationProps {
  user: User;
  text?: string;
  isRequest: boolean;
}
const Notification: React.FC<NotificationProps> = ({
  user,
  text,
  isRequest,
}) => {
  return (
    <div className="flex flex-row space-x-2 justify-between items-center py-3 px-3 max-w-90 hover:bg-gray-100 transition-all duration-150">
      <div className="flex flex-row space-x-2 items-center">
        <img
          className="rounded-full size-10"
          src={`http://localhost:3000/${user?.imgUrl}`}
        />
        <p className="max-w-60 text-sm">
          {isRequest ? `${user?.username} wants to be friend with you.` : text}
        </p>
      </div>
      {isRequest && (
        <div className="flex flex-row space-x-2">
          <X
            className="m-1 rounded-full hover:bg-gray-300"
            onClick={() => {
              alert("reject");
            }}
          />
          <Check
            className="rounded-full m-1 hover:bg-gray-300"
            onClick={() => {
              alert("accept");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Notification;
