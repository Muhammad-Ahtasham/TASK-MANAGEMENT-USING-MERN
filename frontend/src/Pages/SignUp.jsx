import { Link, Navigate, useNavigate} from "react-router-dom";
import { notifySuccess,notifyError } from "../utils";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
function SignUp() {
  const [SignUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo((prev) => ({
      ...prev,
      [name]: value
    }));
    console.log(`${name}: ${value}`);
  };
  const Navigate = useNavigate();
  const handleSubmit =  async (e) => {
    e.preventDefault();
    console.log("Sign Up Info:", SignUpInfo);
    const { name, email, password } = SignUpInfo;
    if (!name || !email || !password) {
      console.error("All fields are required");
      notifyError("All fields are required");
      return;
    }

   
    try {
     
      const url = 'http://localhost:3000/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: SignUpInfo.name.trim(),
          email: SignUpInfo.email.trim(),
          password: SignUpInfo.password.trim()
        }),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        result = { message: "Invalid server response" };
      }
      const {error} = result;
      if (response.ok) {
        console.log("Sign Up Successful:", result);
        notifySuccess(result.message || "Sign Up Successful");
        setSignUpInfo({ name: "", email: "", password: "" }); 
        setTimeout(() => {
          Navigate("/login");
        }, 1000);
      } else if(error) {
        const details=error.details[0].message;
        notifyError(details);
      
      }
      else {
        console.error("Sign Up Failed:", result.message || result.error || JSON.stringify(result));
        notifyError(result.message || result.error || "Sign Up Failed");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      notifyError("Sign Up Failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700">
      
      {/* Left Side - Sign Up Form */}
      <div className="flex items-center justify-center w-1/2 p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-emerald-700 mb-2">
            Create Your Account
          </h1>
          <p className="text-center text-gray-500 mb-6">Join us and start managing your tasks today!</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                Username
              </label>
              <input
                onChange={handleChange}
                id="name"
                name="name"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Your name"
                value={SignUpInfo.name}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="you@example.com"
                value={SignUpInfo.email}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="••••••••"
                value={SignUpInfo.password}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-black  font-semibold rounded-lg shadow-md transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-600 hover:text-emerald-500 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="flex flex-col items-center justify-center w-1/2 text-white p-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Task Manager</h1>
        <p className="text-lg max-w-md leading-relaxed">
          Take control of your productivity from day one.  
          Create an account, customize your workflow,  
          and start ticking off tasks like never before.
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}



export default SignUp;
