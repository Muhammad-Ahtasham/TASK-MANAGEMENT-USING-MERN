import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {  ToastContainer } from "react-toastify";
import { notifySuccess,notifyError } from "../utils";

function TaskUpdatePage() {
  const { taskid } = useParams(); // task id from url
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const token = localStorage.getItem("token");
  const backendUrl = `http://localhost:3000/tasks/${taskid}`;

  // Fetch single task details on mount
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(backendUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log("Fetched task data:", data);
        if (res.ok) {
          setTask(data);
          setTitle(data.title);
          setDescription(data.description);
          setStatus(data.status);
        } else {
          notifyError(data.message || "Failed to fetch task");
        }
      } catch (error) {
        notifyError("Server error: " + error.message);
      }
    };

    fetchTask();
  }, [backendUrl, token]);

  // Handle form submit to update task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(backendUrl, {
        method: "PUT", // ya PATCH agar aap backend mein use karte ho
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, status }),
      });

      const data = await res.json();

      if (res.ok) {
        notifySuccess("Task updated successfully!");
        // Redirect back to task list page after 1.5s delay
        setTimeout(() => {
    navigate("/home/TaskListPage");  // <-- Yahan change karo "/tasks" se
  }, 1500);
      } else {
        notifyError(data.message || "Failed to update task");
      }
    } catch (error) {
      notifyError("Server error: " + error.message);
    }
  };

  if (!task) return <div>Loading task details...</div>;

  return (
    <>

      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-5 text-green-700">Update Task</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            className="w-full border rounded p-2 mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="block mb-2 font-medium">Description</label>
          <textarea
            rows="4"
            className="w-full border rounded p-2 mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <label className="block mb-2 font-medium">Status</label>
          <select
            className="w-full border rounded p-2 mb-4"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="pending">Pending</option>
            <option value="running">Running</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>

          <button
            type="submit"
            className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700"
          >
            Update Task
          </button>
        </form>
      </div>

      <ToastContainer />
    </>
  );
}

export default TaskUpdatePage;
