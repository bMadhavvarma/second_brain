import BrainIcon from "../Icons/BrainIcon";
import SidebarItem from "./SidebarItem";
import { FaTwitter, FaYoutube, FaFileAlt, FaLink, FaHashtag } from "react-icons/fa"; // or use your own icons

const Sidebar = () => {
  return (
    <div className="h-full p-5 w-64 bg-gray-50 border-r border-gray-200">
      <div className="flex  gap-2 ">
      <BrainIcon/>
      <h1 className="text-xl font-bold mb-6">Second Brain</h1>
      </div>
      

      <SidebarItem icon={<FaTwitter />} label="Tweets" />
      <SidebarItem icon={<FaYoutube />} label="Videos" />
      <SidebarItem icon={<FaFileAlt />} label="Documents" />
      <SidebarItem icon={<FaLink />} label="Links" />
      <SidebarItem icon={<FaHashtag />} label="Tags" />
    </div>
  );
};

export default Sidebar;
