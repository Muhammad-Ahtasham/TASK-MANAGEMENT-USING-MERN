
import DashBoard from "../components/DashBoard";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "../components/Navigation";
function Home() {
  return (
    <div className="flex min-h-screen p-6">
      
      {/* Left Sidebar */}
      <DashBoard />

      {/* Right side: Navigation + Outlet */}
      <div className="flex-1 flex flex-col ml-6 bg-white rounded-lg shadow-lg">
        
        {/* Navigation at top */}
        <nav className="border-b p-4">
          <Navigation />
        </nav>

        {/* Main content below navigation */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>

      </div>

      <ToastContainer />
    </div>
  

  );
}

export default Home;
