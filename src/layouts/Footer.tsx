import { MessagesSquare } from "lucide-react";
const Footer = () => {
  return (
    <div className="fixed absolute bottom-0 w-full">
      <div className="flex flex-row justify-end">
        <div className="flex flex-row px-10 py-2 border border-gray-300 hover:cursor-pointer">
          <MessagesSquare />
          <p className="pl-2">Messages</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
