import { useAuth } from "../context/AuthProvider";
import { useRef } from "react";

const ProfilePage: React.FC = () => {
  const { token, currentUser, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent) => {
    const file = fileInputRef?.current?.files?.[0];

    const formData = new FormData();
    if (file) formData.append("image", file);
    formData.append("id", `${currentUser?._id}`);
    formData.append("username", `${currentUser?.username}`);

    fetch("http://localhost:3000/api/user/profilePhoto", {
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
        console.log(response);
        const data = {
          _id: response._id,
          username: response.username,
          imgUrl: response.imgUrl,
        };
        updateUser(data);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="w-screen h-screen pt-10 flex flex-col justify-center items-center font-light  text-black ">
      <div className="">
        <div className="flex flex-col items-center justify-between space-x-10">
          <form className="mx-auto" encType="multipart/form-data" method="post">
            <img
              className="size-30 rounded-full object-contain mx-auto "
              src={`http://localhost:3000/${currentUser?.imgUrl}`}
            />
            <label
              className="hover:cursor-pointer text-blue-400 select-none"
              onClick={() => fileInputRef?.current?.click()}
            >
              Change profile photo
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleChange}
            />
          </form>
          <div className="flex flex-col">
            <p className="text-2xl border-b">{currentUser?.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
