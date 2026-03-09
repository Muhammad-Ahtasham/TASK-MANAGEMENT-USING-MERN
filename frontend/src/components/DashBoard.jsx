import { useEffect, useState  } from "react";
import {  useNavigate } from "react-router-dom";
import {  notifySuccess } from "../utils";
import { ToastContainer } from "react-toastify";

function DashBoard(){
    const Navigate=useNavigate();
  const [loggedInUser,setLoggedInUser]=useState('');
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    localStorage.removeItem("cart"); // Force clear if needed

    
    setLoggedInUser(user || "");
    
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    notifySuccess('User logged out');
    setTimeout(() => {
      Navigate('/login');
    }, 1000);
  }

    return(
        <>
         {/* Left side panel */}
  <div className="w-1/4 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
    <div>
      <h1 className="text-2xl font-bold   text-emerald-700 mb-4">Welcome, {loggedInUser} 👋</h1>
    </div>
    <button 
      onClick={handleLogout} 
      className="mt-auto px-6 py-2 bg-red-600 hover:bg-red-700 transition duration-300 rounded-full  text-emerald-700 text-lg shadow-lg"
    >
      Logout
    </button>
  </div>
  <ToastContainer/>
        </>
    )
}
export default DashBoard;