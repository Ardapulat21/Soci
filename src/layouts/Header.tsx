import { Bell } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import NotificationTab from "../components/NotificationTab";
import ProfileTab from "../components/ProfileTab";
import { useEffect, useState } from "react";

const Header = () => {
  const [isProfileTabOpen, setIsProfileTabOpen] = useState(false);
  const [isNotificationTabOpen, setIsNotificationTabOpen] = useState(false);
  const { token, currentUser } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://144.91.99.115:3001/api/user/fetchUserById", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: currentUser?._id,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setRequests(response.pendingRequests);
        setNotifications(response.notifications);
      });
  }, []);
  return (
    <div className="fixed w-full select-none z-50">
      <div className="flex flex-row justify-between px-3 py-1 font-light ">
        <div className="flex flex-row justify-center items-center space-x-2 italic text-blue-400">
          <a className="text-xl" href="/">
            SOCI
          </a>
          <nav>
            <ul className="flex flex-row space-x-2 border-l pl-1">
              <li className="hover:text-gray-100">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-gray-100">
                <Link to="/Friends">Friends</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-row space-x-4 italic items-center ">
          <div className="relative">
            <Bell
              className="p-1 size-7 text-gray-600 font-light rounded-full hover:bg-blue-300 hover:text-white hover:cursor-pointer"
              onClick={() => setIsNotificationTabOpen(!isNotificationTabOpen)}
            ></Bell>
            {notifications?.length > 0 ||
              (requests?.length > 0 && (
                <span className="absolute top-0 right-0.5 h-3 w-3 rounded-full bg-red-500 border-2 border-white" />
              ))}
            {isNotificationTabOpen && (
              <NotificationTab
                requests={requests}
                setRequest={setRequests}
                notifications={notifications}
                setNotifications={setNotifications}
                onClose={() => setIsNotificationTabOpen(false)}
              />
            )}
          </div>
          <div>
            <img
              className="object-cover rounded-full size-7"
              src={`http://144.91.99.115:3001/${currentUser?.imgUrl}`}
              onClick={() => setIsProfileTabOpen(!isProfileTabOpen)}
            />
            {isProfileTabOpen && (
              <ProfileTab
                onClose={() => {
                  setIsProfileTabOpen(false);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
