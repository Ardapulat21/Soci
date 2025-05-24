import { Bell, Search } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import NotificationTab from "../components/NotificationTab";
import ProfileTab from "../components/ProfileTab";
import { useEffect, useState } from "react";

export interface NotificationProps {
  requests: any[];
  notifications: any[];
}
const Header = () => {
  const [isProfileTabOpen, setIsProfileTabOpen] = useState(false);
  const [isNotificationTabOpen, setIsNotificationTabOpen] = useState(false);
  const { token, currentUser } = useAuth();
  const [notifications, setNotifications] = useState<NotificationProps>();
  useEffect(() => {
    fetch("http://localhost:3000/api/user/fetchUserById", {
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
        setNotifications({
          requests: response.pendingRequests,
          notifications: response.notifications,
        });
      });
  }, []);
  return (
    <div className="fixed w-full select-none">
      <div className="flex flex-row justify-between px-3 py-1 font-light">
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
                <Link to="/Explore">Explore</Link>
              </li>
              <li className="hover:text-gray-100">
                <Link to="/Friends">Friends</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-row space-x-4 italic items-center ">
          <form className="flex px-2 w-40 border-1 border-gray-300 bg-white text-gray-600 rounded-lg transition-all duration-300 ">
            <input className="outline-none overflow-hidden max-w-30" />
            <Search className="text-gray-600" />
          </form>
          <div>
            <Bell
              className="p-1 size-7 text-gray-600 font-light rounded-full hover:bg-blue-300 hover:text-white hover:cursor-pointer"
              onClick={() => setIsNotificationTabOpen(!isNotificationTabOpen)}
            />
            {isNotificationTabOpen && (
              <NotificationTab
                notifications={notifications}
                onClose={() => setIsNotificationTabOpen(false)}
              />
            )}
          </div>
          <div>
            <img
              className="object-cover rounded-full size-7"
              src={`http://localhost:3000/${currentUser?.imgUrl}`}
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
