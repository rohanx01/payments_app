import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signin = () => {
  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className=" flex items-center justify-center w-screen h-screen bg-[#7f7f7f]">
      <div className="border py-7 px-6 rounded-lg bg-white">
        <div className="text-4xl font-bold text-center pb-2">Sign In</div>
        <div className="text-center pb-4 text-gray-500 font-medium">
          Enter your credentials to access your <br />
          account
        </div>
        <div className="flex flex-col space-y-4 pb-4">
          <div>
            <label className="block text-sm font-medium pb-1">
              Email/Username
            </label>
            <input
              placeholder="johndoe@example.com"
              className="border p-2 w-full mt-1 rounded-lg focus:ring-violet-400"
              onChange={(e)=>{
                setUsername(e.target.value);
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium pb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="border p-2 w-full mt-1 rounded-lg"
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <button
          className="bg-black text-white text-center w-full p-2 rounded-lg hover:bg-opacity-90 focus:ring-blue-400 focus:ring-2"
          onClick={() => {
            axios
              .post("http://localhost:3000/api/v1/user/signin", {
                username: username,
                password: password,
              })
              .then((response) => {
                //   console.log(response.data.token)
                sessionStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              })
              .catch((error) => {
                console.log(error);
                alert(error.response.data.message);
              });
          }}
        >
          Sign In
        </button>
        <div className="text-center pt-3">
          Don't have an account?{" "}
          <a
            href=""
            className="underline hover:text-blue-900"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};
