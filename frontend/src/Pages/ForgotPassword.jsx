import { useState } from "react";
import { notifyError, notifySuccess } from "../utils";
import { Link ,useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
  setEmail(e.target.value);
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        result = { message: "Invalid server response" };
      }

      const { error } = result;

      if (response.ok) {
        notifySuccess(result.message || "Reset link sent successfully");
        setEmail(""); // reset input
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else if (error && error.details && error.details[0]) {
        notifyError(error.details[0].message);
      } else {
        notifyError(result.message || result.error || "Something went wrong");
      }

    } catch (error) {
      console.error("Error during forgot password:", error);
      notifyError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700">
      
      {/* Left Side - Login Form */}
      <div className="flex items-center justify-center w-1/2 p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-emerald-700 mb-6">
            Forgot your password?
          </h1>
           <p className="text-3xl text-center text-emerald-700 mb-6">Enter your email and we’ll send you a password reset link.</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                Enter Email Address
              </label>
              <input
                onChange={handleChange}
                name="email"
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="you@example.com"
          
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-black font-semibold rounded-lg shadow-md transition duration-200"
            >
              Send Reset Link
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
          
            <Link to="/login" className="text-emerald-600 hover:text-emerald-500 font-semibold">
              Back to login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="flex flex-col items-center justify-center w-1/2 text-white p-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Task Manager</h1>
        <p className="text-lg max-w-md leading-relaxed">
          Don’t worry if you’ve forgotten your password.  
      We’ll help you get back into your account quickly and securely.  
      Your journey doesn’t stop here!
        </p>
      </div>

      <ToastContainer />
    </div>


    



  );
}

export default ForgotPassword;
