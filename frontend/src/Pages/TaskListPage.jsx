import React, { useEffect, useState } from "react";
import Badge from "../components/Badge";
import { notifySuccess,notifyError } from "../utils";
import { Link } from "react-router-dom";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend API url
  const backendUrl = "http://localhost:3000/tasks";

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(backendUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTasks(data);
      } else {
        notifyError(data.message || "Failed to fetch tasks");
      }
    } catch (error) {
      notifyError("Server error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete task handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`${backendUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        notifySuccess("Task deleted successfully");
        // Remove deleted task from state
        setTasks(tasks.filter((task) => task._id !== id));
      } else {
        notifyError(data.message || "Failed to delete task");
      }
    } catch (error) {
      notifyError("Server error: " + error.message);
    }
  };

  


  return (
    <div className="pt-5">
      <h1 className="text-2xl font-bold mb-5 text-green-700">My Tasks</h1>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="border p-3 rounded-md mb-5 shadow-sm hover:shadow-md"
          >
            <h3 className="text-lg font-semibold flex items-center justify-between">
              <span>{task.title}</span>
              <Badge
                props={{
                  color:
                    task.status === "pending"
                      ? "yellow"
                      : task.status === "running"
                      ? "blue"
                      : task.status === "completed"
                      ? "green"
                      : "red",
                  text: task.status.charAt(0).toUpperCase() + task.status.slice(1),
                }}
              />
            </h3>
            <p className="line-clamp-2 mb-3">{task.description}</p>
            <div className="flex gap-5 items-center">
              {/* <button
                
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center inline-flex items-center p-2"
              >
                View / Update
              </button> */}
              <Link
             to={`/home/taskupdate/${task._id}`}
            className="text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center inline-flex items-center p-2"
             >
              View / Update
             </Link>

              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-green text-center inline-flex items-center p-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskListPage;
