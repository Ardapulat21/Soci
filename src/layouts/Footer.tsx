import { MessagesSquare } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "../pages/HomePage";
import { useAuth } from "../context/AuthProvider";
import MessageComponent from "../components/MessageComponent";

const Footer = () => {
  const { token } = useAuth();
  const [isMessagesTabOpen, setIsMessagesTabOpen] = useState(false);
  const [isMessageDialogTabOpen, setIsMessageDialogTabOpen] = useState(false);
  const [messagingFriend, setMessagingFriend] = useState<User | null>(null);
  const [isMessaggingTabOpen, setIsMessaggingTabOpen] = useState(false);
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/user/fetchFriends", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setFriends(response);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="fixed bottom-0 w-full select-none">
      <div className="flex flex-row items-end justify-end font-light">
        {isMessaggingTabOpen && (
          <div>
            <div>
              {isMessageDialogTabOpen && (
                <MessageComponent
                  receiverFriend={messagingFriend}
                  onClose={() => {
                    setIsMessageDialogTabOpen(false);
                  }}
                />
              )}
            </div>
            <div
              className="flex flex-row justify-start items-center w-50 space-x-4 py-1 pl-3 border border-gray-300 bg-white"
              onClick={() => {
                setIsMessageDialogTabOpen(!isMessageDialogTabOpen);
              }}
            >
              <img
                className="size-4 object-fit rounded-full"
                src={`http://localhost:3000/${messagingFriend?.imgUrl}`}
              />
              <p>{messagingFriend?.username}</p>
            </div>
          </div>
        )}
        <div>
          {isMessagesTabOpen && (
            <div>
              {friends.map((friend, key) => (
                <div
                  key={key}
                  className="flex flex-row items-center space-x-3 pl-2 py-1 border-t border-l border-gray-300 bg-white hover:cursor-pointer"
                  onClick={() => {
                    setMessagingFriend(friend);
                    setIsMessaggingTabOpen(true);
                  }}
                >
                  <img
                    className="size-8 object-cover rounded-full"
                    src={`http://localhost:3000/${friend.imgUrl}`}
                  ></img>
                  <p>{friend.username}</p>
                </div>
              ))}
            </div>
          )}
          <div
            className="flex flex-row px-10 py-1 bg-white border border-gray-300 hover:cursor-pointer"
            onClick={() => setIsMessagesTabOpen(!isMessagesTabOpen)}
          >
            <MessagesSquare />
            <p className="pl-2">Messages</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
