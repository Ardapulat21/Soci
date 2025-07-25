import { useRef, useState } from "react";
import type { Post } from "../pages/HomePage";
import { useAuth } from "../context/AuthProvider";
type PostCreationComponentProps = {
  onClose: () => void;
  updateContent: (contents: Post) => void;
};

const PostCreationComponent = ({
  onClose,
  updateContent,
}: PostCreationComponentProps) => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { token } = useAuth();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const file = fileInputRef?.current?.files?.[0];

    if (!file && !content) return;
    const formData = new FormData();
    if (file) formData.append("image", file);
    if (content) formData.append("description", content);

    formData.append("id", `${currentUser?._id}`);
    formData.append("username", `${currentUser?.username}`);
    formData.append("imgUrl", `${currentUser?.imgUrl}`);
    formData.append("date", new Date().toString());

    fetch("http://144.91.99.115:3001/api/post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("error");
        }
        return response.json();
      })
      .then((response) => {
        updateContent(response);
      })
      .catch((error) => console.error(error));

    onClose();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <div className="w-140 border border-white rounded-l bg-white">
        <div className="flex flex-row justify-end mt-1 mr-2 ">
          <button
            className="text-gray-400 hover:cursor-pointer hover:text-gray-800"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <form
          className="p-2 space-y-3"
          onSubmit={(e) => handleSubmit(e)}
          encType="multipart/form-data"
          method="post"
        >
          <div className="flex flex-row space-x-3">
            <div className="size-14">
              <img src={`http://144.91.99.115:3001/${currentUser?.imgUrl}`} />
            </div>
            <div className="w-full">
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                placeholder={`Hey ${currentUser?.username} What's up?`}
                className="outline-0 w-full font-light text-gray-600 h-full"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <img id="img" src={imageUrl} className="max-h-60" />
          </div>
          <div className="flex flex-row justify-between mt-5">
            <div>
              <input
                type="file"
                id="fileInput"
                name="fileInput"
                className="hidden"
                accept="image/png, image/jpeg"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <label
                htmlFor="fileInput"
                className="border border-gray-400 rounded-full text-sm p-2 hover:cursor-pointer"
              >
                Add Image
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="border border-gray-400 rounded-full text-sm text-white p-2 hover:cursor-pointer bg-blue-500"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PostCreationComponent;
