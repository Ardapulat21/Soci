import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import type { User } from "../pages/HomePage";
import { SendHorizonal, X } from "lucide-react";
import socket from "../socket.tsx";
interface MessageProps {
  receiverFriend: User | null;
  onClose: () => void;
}
interface MessageInfo {
  room: string;
  senderId: string;
  message: string;
}
const getRoomName = (
  userId1: string | undefined,
  userId2: string | undefined
): string => {
  const ids = [userId1, userId2].sort();
  return `chat_${ids[0]}_${ids[1]}`;
};
const MessageComponent: React.FC<MessageProps> = ({
  receiverFriend,
  onClose,
}) => {
  const { currentUser, token } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageInfo[]>([]);
  const room = getRoomName(currentUser?._id, receiverFriend?._id);

  useEffect(() => {
    fetch("http://localhost:3000/api/message/fetchMessages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        senderId: currentUser?._id,
        receiverId: receiverFriend?._id,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setMessages(response.messages.messageSequence.reverse());
      });
    socket.emit("join_room", room);

    socket.on("receive_message", (data) => {
      const parsedData = JSON.parse(data);
      setMessages((prev) => [
        {
          room: parsedData.room,
          senderId: parsedData.senderId,
          message: parsedData.message,
        },
        ...prev,
      ]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleSend = () => {
    socket.emit(
      "send_message",
      JSON.stringify({
        room,
        message,
        senderId: currentUser?._id,
      })
    );
    setMessage("");
  };
  return (
    <>
      <div className="flex flex-col h-60 border border-gray-300 bg-white">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center p-1 space-x-2 ">
            <img
              className="size-7 object-cover rounded-full"
              src={`http://localhost:3000/${receiverFriend?.imgUrl}`}
            />
            <p>{receiverFriend?.username}</p>
          </div>
          <X
            className="rounded-full hover:bg-gray-200 text-gray-700"
            onClick={onClose}
          />
        </div>

        <div className="flex flex-col justify-between h-50">
          <div className="flex flex-col-reverse max-w-50 h-full py-1 text-sm overflow-y-scroll ">
            {messages.map((messageInfo, key) => {
              return (
                <div
                  key={key}
                  className={`flex flex-row ${
                    receiverFriend?._id.toString() === messageInfo.senderId
                      ? "flex-row"
                      : "justify-start flex-row-reverse"
                  } items-center px-2 pb-1`}
                >
                  <img
                    className="size-6 object-cover border border-white rounded-full mx-1"
                    src={
                      receiverFriend?._id.toString() === messageInfo.senderId
                        ? `http://localhost:3000/${receiverFriend?.imgUrl}`
                        : `http://localhost:3000/${currentUser?.imgUrl}`
                    }
                  />
                  <p>{messageInfo.message}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-row justify-start border-t border-gray-300 px-2 py-1 space-x-4 text-sm">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 rounded-xl px-2 w-35"
            />
            <button
              className="text-gray-500 hover:cursor-pointer hover:text-blue-500"
              onClick={handleSend}
            >
              <SendHorizonal />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageComponent;
