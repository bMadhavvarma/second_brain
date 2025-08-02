import type { ReactElement } from "react";

interface SidebarItemProps {
  icon: ReactElement;
  label: string;
}

const SidebarItem = ({ icon, label }: SidebarItemProps) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-200 rounded-md cursor-pointer text-gray-700 transition-all">
      <div className="text-xl text-gray-500">{icon}</div>
      <span className="text-base font-medium text-gray-600">{label}</span>
    </div>
  );
};

export default SidebarItem;
