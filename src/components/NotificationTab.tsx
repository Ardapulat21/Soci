import type { NotificationProps } from "../layouts/Header";
import { useEffect, useRef, useState } from "react";
import Notification from "./Notification";
import { useAuth } from "../context/AuthProvider";
interface NotificationTabProps {
  notifications?: any[];
  requests?: any[];
  onClose: () => void;
}
const NotificationTab: React.FC<NotificationTabProps> = ({
  notifications,
  requests,
  onClose,
}) => {
  const [requestState, setRequestState] = useState<any[]>(requests ?? []);
  const [notificationState, setNotificationState] = useState<any[]>(
    notifications ?? []
  );
  const [isRequestTabOpen, setIsRequestTabOpen] = useState(
    requestState.length > notificationState.length ? true : false
  );
  const popupRef = useRef<HTMLDivElement>(null);
  const { token } = useAuth();
  const acceptInvite = (userId: string) => {
    fetch("http://localhost:3000/api/user/acceptInvite", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        toUserId: userId,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setRequestState(response);
      });
  };
  const declineInvite = (userId: string) => {
    fetch("http://localhost:3000/api/user/declineInvite", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        toUserId: userId,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setRequestState(response);
      });
  };
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
        className="absolute flex flex-col top-10 right-15 border-1 min-w-70 min-h-15 border-gray-300 bg-white text-gray-600"
      >
        <p
          className="text-right pr-2 text-blue-400"
          onClick={() => setIsRequestTabOpen(!isRequestTabOpen)}
        >
          {isRequestTabOpen ? "Notifications" : "Pending Request"}
        </p>

        {isRequestTabOpen ? (
          requestState.length > 0 ? (
            requestState.map((user) => (
              <Notification
                user={user}
                isRequest={true}
                acceptInvite={() => acceptInvite(user._id)}
                declineInvite={() => declineInvite(user._id)}
              />
            ))
          ) : (
            <p className="text-left pl-3">There is no request</p>
          )
        ) : notificationState.length > 0 ? (
          notificationState.map((not) => (
            <Notification
              user={not.user}
              notificationType={not.notificationType}
              isRequest={false}
            />
          ))
        ) : (
          <p className="text-left pl-3">There is no notification</p>
        )}
      </div>
    </div>
  );
};

export default NotificationTab;
