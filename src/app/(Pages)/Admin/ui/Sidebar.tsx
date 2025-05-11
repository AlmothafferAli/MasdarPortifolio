import React from "react";
import { FaCog, FaProjectDiagram, FaServer, FaUsers } from "react-icons/fa";

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const setup = [
  {
    name: "اعداد الرئيسية",
    key: "setup",
    icon: <FaCog className="w-5 h-5" />,
  },
  {
    name: "المشاريع",
    key: "projects",
    icon: <FaProjectDiagram className="w-5 h-5" />,
  },
  {
    name: "الخدمات",
    key: "services",
    icon: <FaServer className="w-5 h-5" />,
  },
  {
    name: "اعداد الشركاء",
    key: "partners",
    icon: <FaUsers className="w-5 h-5" />,
  },
  {
    name: "اعداد الموظفين",
    key: "employees",
    icon: <FaUsers className="w-5 h-5" />,
  },
  {
    name: " لمحة عن الشركة",
    key: "about",
    icon: <FaUsers className="w-5 h-5" />,
  },
  {
    name: "اعداد التواصل",
    key: "communication",
    icon: <FaUsers className="w-5 h-5" />,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
  return (
    <div className="w-full md:w-2/12 bg-gradient-to-br from-[#31a4dc] to-[#1e88e5] h-full text-white shadow-xl">
      <div className="p-4 md:p-6 md:pl-20">
        <h2 className="text-2xl font-bold mb-8 text-center border-b border-white/20 pb-4">
          لوحة التحكم
        </h2>
        <nav className="flex md:flex-col gap-3 md:gap-2 md:space-y-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
          {setup.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveItem(item.key)}
              className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 whitespace-nowrap ${
                activeItem === item.key
                  ? "bg-white text-blue-600 shadow-lg transform scale-105"
                  : "hover:bg-white/10 hover:transform hover:scale-105"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-right font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 