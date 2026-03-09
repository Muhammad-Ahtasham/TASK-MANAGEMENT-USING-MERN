import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { notifyError,notifySuccess } from "../utils";
import { motion } from "framer-motion";

function Login() {
  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value
    }));
    console.log(`${name}: ${value}`);
  };
  const Navigate = useNavigate();
  const handleSubmit =  async (e) => {
    e.preventDefault();
    console.log("Login Up Info:", LoginInfo);
    const {email, password } = LoginInfo;
    if (!email || !password) {
      console.error("All fields are required");
      notifyError("All fields are required");
      return;
    }

   
    try {
     
      const url = 'http://localhost:3000/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: LoginInfo.email.trim(),
          password: LoginInfo.password.trim()
        }),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        result = { message: "Invalid server response" };
      }
      const {error ,token,username} = result;
      if (response.ok) {
        console.log("Login Successful:", result);
        notifySuccess(result.message || "Login Successful");
        localStorage.setItem('token',token);
        localStorage.setItem('loggedInUser',username)
        setLoginInfo({email: "", password: "" }); 
        setTimeout(() => {
          Navigate("/home");
        }, 1000);
      } else if(error) {
        const details=error.details[0].message;
        notifyError(details);
      
      }
      else {
        console.error("Login  Failed:", result.message || result.error || JSON.stringify(result));
        notifyError(result.message || result.error || "Login Failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      notifyError("Login  Failed");
    }
  };
 


  return (
    
    <div className="flex min-h-screen bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700">
      
      {/* Left Side - Login Form */}
      <div className="flex items-center justify-center w-1/2 p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-emerald-700 mb-6">
            Sign in to your account
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                onChange={handleChange}
                name="email"
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="you@example.com"
                value={LoginInfo.email}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                onChange={handleChange}
                name="password"
                id="password"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="••••••••"
                value={LoginInfo.password}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link to="/forgotpassword" className="text-sm text-emerald-600 hover:text-emerald-500">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-black font-semibold rounded-lg shadow-md transition duration-200"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-emerald-600 hover:text-emerald-500 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="flex flex-col items-center justify-center w-1/2 text-white p-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Task Manager</h1>
        <p className="text-lg max-w-md leading-relaxed">
          Manage your tasks effortlessly. Stay organized, stay productive, and achieve more every day!
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}


export default Login;
