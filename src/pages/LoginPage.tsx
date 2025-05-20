import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const [status, setStatus] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verificationPassword, setVerificationPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin === false && password !== verificationPassword) {
      console.log("Password is not same.");
      return;
    }
    const credentials = {
      username,
      password,
    };

    fetch(`http://localhost:3000/api/auth/${isLogin ? "login" : "register"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then(async (response) => {
        if (!response.ok) {
          const err = await response.json();
          setStatus(err.message);
          throw new Error("Authentication is failed " + err.message);
        }
        return await response.json();
      })
      .then((response) => {
        setStatus("");
        if (!isLogin) {
          navigate("/auth");
          return;
        }
        login({
          token: response.token,
          user: {
            _id: response.sessionInfo._id,
            username: response.sessionInfo.username,
            imgUrl: response.sessionInfo.imgUrl,
          },
        });
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="h-screen py-10 text-gray-500 ">
      <div className="flex flex-row justify-center p-4 space-x-4 font-light h-full ">
        <div className="flex justify-center items-center w-85 rounded-l bg-linear-to-r/decreasing from-pink-300 to-blue-100">
          <div className="absolute top-2 size-24 rounded-full bg-conic-180 from-pink-600 via-indigo-50 to-pink-600"></div>
          <p>Hey its soci! your social platform</p>
        </div>
        <div className="flex flex-col justify-center items-center w-85 h-full rounded-l bg-linear-to-r/increasing from-blue-100 to-indigo-300">
          <div className="absolute top-2 size-24 rounded-full bg-conic-180 from-indigo-600 via-indigo-50 to-indigo-600"></div>
          {isLogin ? (
            <form
              onSubmit={handleAuth}
              className="space-y-3 w-80"
              method="post"
            >
              <div className="flex flex-col text-left space-y-2">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-8 pl-1 border border-gray-300 outline-0 hover:border-gray-400 transition-all duration-200"
                  required
                ></input>
              </div>
              <div className="flex flex-col text-left space-y-2">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-8 pl-1 border border-gray-300 outline-0 hover:border-gray-400 transition-all duration-200"
                  required
                ></input>
              </div>
              <button
                type="submit"
                className="w-full h-8 border border-gray-300 mt-2 px-4 py-0.5 hover:cursor-pointer hover:text-white hover:bg-blue-300 transition-all duration-300"
              >
                Login
              </button>
              <p
                onClick={() => setIsLogin(!isLogin)}
                className="pt-10 hover:cursor-pointer"
              >
                Haven't you created an account yet?
              </p>
            </form>
          ) : (
            <form
              onSubmit={handleAuth}
              className="space-y-3 w-80"
              method="post"
            >
              <div className="flex flex-col text-left space-y-2">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-8 pl-1 border border-gray-300 outline-0 hover:border-gray-400 transition-all duration-200"
                  required
                ></input>
              </div>
              <div className="flex flex-col text-left space-y-2">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-8 pl-1 border border-gray-300 outline-0 hover:border-gray-400 transition-all duration-200"
                  required
                ></input>
                <label>Password again</label>
                <input
                  type="password"
                  value={verificationPassword}
                  onChange={(e) => setVerificationPassword(e.target.value)}
                  className="h-8 pl-1 border border-gray-300 outline-0 hover:border-gray-400 transition-all duration-200"
                  required
                ></input>
              </div>
              <button
                type="submit"
                className="w-full h-8 border border-gray-300 mt-2 px-4 py-0.5 hover:text-white hover:cursor-pointer hover:bg-blue-300 transition-all duration-300"
              >
                Register
              </button>
              <p
                onClick={() => setIsLogin(!isLogin)}
                className="pt-10 hover:cursor-pointer"
              >
                Do you have an account?
              </p>
            </form>
          )}
          <p className="mt-10 text-red-400">{status}</p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
