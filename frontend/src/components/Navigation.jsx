import React from "react";
import {  NavLink, useLocation } from "react-router-dom";
import NewTask from "../Pages/NewTask";
import TaskListPage from "../Pages/TaskListPage";

const Navigation = () => {
  const location = useLocation();

  const buttonClass =
  "py-2.5 px-5 me-2 mb-2 font-medium text-white bg-green-600 rounded-lg border border-green-600 hover:bg-green-700 hover:border-green-700 focus:outline-none focus:ring-4 focus:ring-green-300";

const activeButtonClass =
  "py-2.5 px-5 me-2 mb-2 font-medium text-white bg-green-800 rounded-lg border border-green-800 focus:outline-none focus:ring-4 focus:ring-green-500";


  return (
    
      <div className="pb-5 border-b flex gap-6 px-4">

      <NavLink
        to="/home/NewTask"
        className={({ isActive }) =>
          isActive ? activeButtonClass : buttonClass
        }
      >
        Create New Task
      </NavLink>
      <NavLink
        to="/home/TaskListPage"
        className={({ isActive }) =>
          isActive ? activeButtonClass : buttonClass
        }
      >
        My Tasks
      </NavLink>
    </div>
  );
};

export default Navigation;