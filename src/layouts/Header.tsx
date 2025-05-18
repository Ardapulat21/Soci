import { useState } from "react";
import { Search } from "lucide-react";
import { useAuth } from "../context/AuthProvider";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="fixed w-full">
      <div className="flex flex-row justify-between px-3 py-1 text-blue-400">
        <div className="text-xl font-medium italic">
          <p>SOCI</p>
        </div>
        <div className="flex flex-row space-x-4 italic items-center ">
          <form className="flex px-2 w-40 border-1 border-gray-300 bg-white text-gray-600 rounded-lg transition-all duration-300 ">
            <input className="outline-none overflow-hidden max-w-30" />
            <Search
              className="text-gray-600"
              onClick={() => {
                alert("heh");
              }}
            />
          </form>
          <button className="hover:text-blue-300 rounded-full">Home</button>
          <button className="hover:text-blue-300 rounded-full">Friends</button>
          <button className="hover:text-blue-300 rounded-full">Explore</button>
          <div className="flex flex-col">
            <img
              className="object-cover rounded-full size-7"
              src={`http://localhost:3000/${currentUser?.imgUrl}`}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            />
            {isProfileOpen && (
              <div className="absolute flex flex-col top-10 right-2 border-1 border-gray-300 bg-white text-gray-600 transition-all duration-300">
                <div className="flex flex-row justify-center items-center space-x-3 rounded-xl px-5 py-2 ">
                  <img
                    className="object-cover rounded-full size-10"
                    src={`http://localhost:3000/${currentUser?.imgUrl}`}
                  />
                  <div className="text-l font-semibold">Arda Pulat</div>
                </div>
                <button className="block hover:bg-gray-300">Profile</button>
                <button
                  className="text-red-600 hover:bg-gray-300"
                  onClick={logout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
