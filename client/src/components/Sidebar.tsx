import BrainIcon from "../Icons/BrainIcon";
import SidebarItem from "./SidebarItem";
import { FaTwitter, FaYoutube, FaFileAlt, FaLink, FaHashtag } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    window.location.href = "/signin"; // redirect after logout
  };

  return (
    <div className="h-full p-5 w-64 bg-gray-50 border-r border-gray-200 flex flex-col justify-between">
      {/* Top part */}
      <div>
        <div className="flex gap-2 mb-6">
          <BrainIcon />
          <h1 className="text-xl font-bold">Second Brain</h1>
        </div>

        <SidebarItem icon={<FaTwitter />} label="Tweets" />
        <SidebarItem icon={<FaYoutube />} label="Videos" />
        <SidebarItem icon={<FaFileAlt />} label="Documents" />
        <SidebarItem icon={<FaLink />} label="Links" />
        <SidebarItem icon={<FaHashtag />} label="Tags" />
      </div>

      {/* Bottom logout */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
