'use client'
import axios from "axios";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);
  const router= useRouter();

  useEffect(() => {
    if(confirmPassword!==password){
        setShowConfirmPasswordError(true);
        setConfirmPasswordError("Password doesn't match");
    }
    else{
        setShowConfirmPasswordError(false);
    }
  }, [confirmPassword])
  


  const handleSignUp= async()=>{

    setShowConfirmPasswordError(false);
    setShowEmailError(false);
    setShowPasswordError(false);
    setShowUsernameError(false);

try {
    
        const response=await axios.post('http://localhost:8080/api/v1/auth/signup',{
            username: userName,
            email,
            password
        });
    
        if(response.status=== 200){
            router.push('/');
            return;
    
        }
        } catch (error:any) {
            if(error.response){
            //    console.log(error.response.data.error);
            if(error.response.data.error==="username already exists"){
                setShowUsernameError(true);
                setUsernameError(error.response.data.error);
                return;
            }
            if(error.response.data.error=== "emailId already exists"){
                setShowEmailError(true);
                setEmailError(error.response.data.error);
                return;
            }
            }
            else{
                console.error(error.message);
            }
        }
    
  
     
    

  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black h-screen w-screen flex justify-center items-center">
      <div className="bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 rounded-2xl p-10 w-[90%] max-w-md flex flex-col gap-6">
        
        <h1 className="text-3xl font-bold text-white text-center">Create Account ✨</h1>
        <p className="text-gray-300 text-center">Sign up to get started</p>
        <div>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Username"
          className="h-12 w-full rounded-xl px-4 bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        {showUsernameError &&
        <p className="ml-2 text-red-500">{usernameError}</p>
        }
        </div>
        <div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="h-12 w-full rounded-xl px-4 bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        {showEmailError &&
        <p className="ml-2 text-red-500">{emailError}</p>
        }
        </div>
        
        <div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="h-12 w-full rounded-xl px-4 bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
         {showPasswordError &&
        <p className="ml-2 text-red-500">{passwordError}</p>
        }

        </div>
        <div>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
          className="h-12 w-full rounded-xl px-4 bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
         {showConfirmPasswordError &&
        <p className="ml-2 text-red-500">{confirmPasswordError}</p>
        }
        </div>

        <button onClick={handleSignUp} className="h-12 w-full rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition duration-300">
          Sign Up
        </button>

        <p className="text-gray-400 text-center text-sm">
          Already have an account?{" "}
          <a href="/" className="text-purple-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
