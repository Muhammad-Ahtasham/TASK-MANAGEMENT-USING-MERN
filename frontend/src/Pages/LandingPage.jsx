import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    // 🌟 Gradient is on full container
    <div className="min-h-screen w-full bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 flex">
      
      {/* Left Side */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center w-1/2 p-12 text-white"
      >
        <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">Task Manager</h1>
        <p className="text-lg mb-10 max-w-md text-gray-100 drop-shadow-sm">
          Organize your daily tasks with ease. Add tasks, mark them as completed,
          and boost your productivity with our simple and user-friendly interface.
        </p>

        <Link to="/login">
          <button className="bg-white text-green-700 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-green-100 transition duration-300">
            Get Started
          </button>
        </Link>
      </motion.div>

      {/* Right Side */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center w-1/2 bg-transparent"
      >
        <motion.img
          src="/task manager pic.webp"
          alt="Task Illustration"
          className="w-full h-full object-contain p-10 drop-shadow-2xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
}
