import { useState } from "react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = () => {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const credentials = {
      username: username,
      password: password,
    };
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .then((error) => console.error(error));
  };
  return (
    <div className="h-screen px-5 py-30 bg-linear-to-r/decreasing from-indigo-200">
      <div className="flex flex-row justify-around p-4 space-x-4 text-gray-600 font-light h-full ">
        <div className="flex justify-center items-center w-full h-full  rounded-l bg-linear-to-r/decreasing from-indigo-300 to-teal-100">
          <div className="absolute top-22 size-24 rounded-full bg-conic-180 from-pink-600 via-indigo-50 to-pink-600"></div>
          <p>Hey its soci! your social platform</p>
        </div>
        <div className="flex flex-col justify-center items-center w-full h-full text-gray-500 rounded-l bg-linear-to-r/increasing from-teal-100 to-indigo-300">
          <div className="absolute top-22 size-24 rounded-full bg-conic-180 from-indigo-600 via-indigo-50 to-indigo-600"></div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="space-y-3 w-80"
            method="post"
          >
            <div className="flex flex-col text-left space-y-2">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-8 border border-gray-300 outline-0 hover:border-gray-400 transition-all duration-200"
                required
              ></input>
            </div>
            <div className="flex flex-col text-left space-y-2">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-8 border border-gray-300 outline-0 hover:border-gray-400 transition-all duration-200"
                required
              ></input>
            </div>
            <button
              type="submit"
              className="w-full h-8 border border-gray-300 mt-2 px-4 py-0.5 hover:cursor-pointer hover:bg-blue-300 transition-all duration-300"
            >
              Login
            </button>
          </form>
          <p onClick={createAccount} className="pt-10 hover:cursor-pointer">
            Haven't you created an account yet?
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
