'use client'
import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const router=useRouter();


  const handleLogin =async()=>{
    setShowPasswordError(false);
    setShowUsernameError(false);

    try {
      const response= await axios.post("http://localhost:8080/api/v1/auth/signin",{
        username: userName,
        password
      })

      if(response.status===200){

        router.push("/dashboard")
        return

      }
      
    } catch (error:any) {

      if(error.response.data.error==="User doesnot exist with username or email"){
        setShowUsernameError(true);
        setUsernameError("User doesnot exist with username or email");
        return;
      }
      if(error.response.data.error==="Incorrect password"){
        setShowPasswordError(true);
        setPasswordError("Incorrect password");
      }

      
    }

  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black h-screen w-screen flex justify-center items-center">
      <div className="bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 rounded-2xl p-10 w-[90%] max-w-md flex flex-col gap-6">
        
        <h1 className="text-3xl font-bold text-white text-center">Welcome Back 👋</h1>
        <p className="text-gray-300 text-center">Login to continue</p>
        <div>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Username"
          className="h-12 w-full rounded-xl px-4 bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {
          showUsernameError && 
          <p className="pl-2 text-red-500">{usernameError}</p>
        }
        </div>
        <div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="h-12 w-full rounded-xl px-4 bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {
          showPasswordError &&
          <p className="ml-2 text-red-500">{passwordError}</p>
        }
        </div>

        <button onClick={handleLogin} className="  hover:cursor-pointer h-12 w-full rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300">
          Login
        </button>

        <p className="text-gray-400 text-center text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
