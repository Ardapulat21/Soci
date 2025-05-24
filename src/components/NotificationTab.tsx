import type { NotificationProps } from "../layouts/Header";
import { useEffect, useRef, useState } from "react";
import Notification from "./Notification";
interface NotificationTabProps {
  notifications?: NotificationProps;
  onClose: () => void;
}
const NotificationTab: React.FC<NotificationTabProps> = ({
  notifications,
  onClose,
}) => {
  const [isRequestTabOpen, setIsRequestTabOpen] = useState(true);

  const popupRef = useRef<HTMLDivElement>(null);
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
          (notifications?.requests ?? []).length > 0 ? (
            notifications?.requests.map((req) => (
              <Notification user={req} isRequest={true} />
            ))
          ) : (
            <p className="text-left pl-3">There is no request</p>
          )
        ) : (notifications?.notifications ?? []).length > 0 ? (
          notifications?.notifications.map((not) => (
            <Notification user={not} text={not.text} isRequest={false} />
          ))
        ) : (
          <p className="text-left pl-3">There is no notification</p>
        )}
      </div>
    </div>
  );
};

export default NotificationTab;
