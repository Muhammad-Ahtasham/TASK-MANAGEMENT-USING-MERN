// ResetPassword.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { notifyError ,notifySuccess} from "../utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`http://localhost:3000/auth/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }), // token body me bhejne ki zarurat nahi
    });

    const result = await response.json();

    if (response.ok) {
      notifySuccess(result.message || "Password reset successfully!");
      setPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      notifyError(result.message || "Something went wrong");
    }
  } catch (error) {
    console.error("Error during reset password:", error);
    notifyError("Something went wrong. Please try again later.");
  }
};

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700">
  
  {/* Left Side - Login Form */}
  <div className="flex items-center justify-center w-1/2 p-8">
    <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg min-h-[500px] flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-center text-emerald-700 mb-8">
        Reset Password
      </h1>

      <form className="space-y-6" onSubmit={handleReset}>
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
            Enter new Password
          </label>
          <input
            name="password"
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-black font-semibold rounded-lg shadow-md transition duration-200"
        >
          Reset Password
        </button>
      </form>
    </div>
  </div>

  {/* Right Side - Branding */}
  <div className="flex flex-col items-center justify-center w-1/2 text-white p-12 text-center min-h-[500px]">
    <h1 className="text-5xl font-bold mb-4">Task Manager</h1>
    <p className="text-lg max-w-md leading-relaxed mb-6">
      Every fresh start begins with a reset.  
      Secure your account, regain control, and move forward stronger than ever!
    </p>
  </div>

  <ToastContainer />
</div>

    


    


  );
};

export default ResetPassword;
