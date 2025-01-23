import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import arrow from "../assets/dashboard/dash-arrow.png";


const Dashboard = ({ setIsLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const getActiveButtonClass = (path) => {
    return location.pathname === path ? "bg-[#212121] text-white" : "text-[#667085]";
  };

  const breadcrumbMap = {
    "/dashboard/my-account": "My Account",
    "/dashboard/profile": "Profile",
    "/dashboard/ads": "Ads",
    "/dashboard/post-ads": "Post Ads",
  };

  const breadcrumbText = breadcrumbMap[location.pathname] || "";

  return (

    <div className=" mx-32 mt-[55px] pb-[100px]">
      <div className="flex gap-3.5  items-center font-bold text-sm font-jakarta text-[#95999D]">
        <div className="">home</div>
        {breadcrumbText && (
          <>
            <img src={arrow} alt="arrow" className="h-[14px] w-[7px]" />
            <div>{breadcrumbText}</div>
          </>
        )}
      </div>

      <div className="flex gap-[20px] mt-[20px]  min-h-[683px] h-full">
        <div className="p-[30px] max-w-[306px] w-full rounded-xl" style={{
          boxShadow: "0px 1px 80px 12px #1A28440F",
        }}>

          <div className="flex flex-col">
            <Link to="/dashboard/my-account">
              <div className={`w-full px-12 py-3.5 mb-2 rounded-[44px] ${getActiveButtonClass("/dashboard/my-account")}`}>My Account</div>
            </Link>
            <Link to="/dashboard/profile">
              <div className={`w-full px-12 py-3.5 mb-2 rounded-[44px] ${getActiveButtonClass("/dashboard/profile")}`}>Profile</div>
            </Link>
            <Link to="/dashboard/ads">
              <div className={`w-full px-12 py-3.5 mb-2 rounded-[44px] ${getActiveButtonClass("/dashboard/ads")}`}>Ads</div>
            </Link>
            <Link to="/dashboard/post-ads">
              <div className={`w-full px-12 py-3.5 mb-2 rounded-[44px] ${getActiveButtonClass("/dashboard/post-ads")}`}>Post Ads</div>
            </Link>
            <div className="w-full px-12 py-3.5 mb-2 rounded-[44px] text-[#667085] cursor-pointer" onClick={handleLogout}>Logout</div>
          </div>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
