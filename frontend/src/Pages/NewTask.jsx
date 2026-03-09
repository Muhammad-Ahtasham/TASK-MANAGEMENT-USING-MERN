import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { notifyError,notifySuccess } from "../utils";
import "react-toastify/dist/ReactToastify.css";

function NewTask(){
      const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending"); // default pending

  
  const backendUrl = "http://localhost:3000/tasks";

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!title || !description || !status) {
      notifyError("Please fill all fields");
      return;
    }

    try {
      // JWT token - aap apne auth context/localStorage se le sakte ho
      const token = localStorage.getItem("token"); // example

      const res = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, status }),
      });

      const data = await res.json();

      if (res.ok) {
        notifySuccess("Task created successfully!");
        // Clear form
        setTitle("");
        setDescription("");
        setStatus("pending");
      } else {
        notifyError(data.message || "Failed to create task");
      }
    } catch (error) {
      notifyError("Server error: " + error.message);
    }
  };
    return(
        <>
   {/* Right side content */}
      <div className="flex-1 bg-white rounded-lg shadow-lg p-6 ml-6">
        <h1 className="text-2xl font-bold text-emerald-700 mb-5">Add Task</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
            <input
              
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
            <textarea
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
                     border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Task description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* New Status Select */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">Status</label>
            <select
              value={status}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select status</option>
              <option value="pending">Pending</option>
              <option value="running">Running</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <button
            type="submit"
            className="text-emerald-700 bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none 
                       focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>

      <ToastContainer />
        </>

    );
}
export default NewTask;