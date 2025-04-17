import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Star,
  FilePlus,
  Settings,
  HelpCircle,
  Sun,
  Moon,
} from "lucide-react";

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    document.documentElement.classList.contains("dark")
  );
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [showProjectMenu, setShowProjectMenu] = useState(false);

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(document.documentElement.classList.contains("dark"));
  };

  const handleProjectClick = () => {
    setShowProjectMenu((prev) => !prev);
  };

  const navItems = [
    {
      icon: FilePlus,
      label: "Project",
      action: handleProjectClick,
    },
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help" },
    {
      icon: darkMode ? Sun : Moon,
      label: darkMode ? "Light Mode" : "Dark Mode",
      action: toggleTheme,
    },
  ];

  return (
    <header className="relative flex items-center justify-between px-6 h-16 bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700 transition-colors duration-500">
      {/* Left Side: Dream Draw Logo */}
      <div className="flex items-center gap-2">
        <Star className="w-6 h-6" />
        <span className="text-xl font-bold">Dream Draw</span>
      </div>

      {/* Right Side: Navigation Icons */}
      <div className="flex items-center gap-4 relative">
        {navItems.map((item, index) => (
          <div key={index} className="relative">
            <Button
              title={item.label}
              variant="ghost"
              className={`w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition-transform duration-300 ease-in-out ${
                hoveredIcon === item.label ? "transform scale-110" : ""
              } focus:outline-none focus:ring-0 active:outline-none active:ring-0`}
              onMouseEnter={() => setHoveredIcon(item.label)}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={item.action || undefined}
            >
              <item.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Button>

            {/* Dropdown for Project */}
            {item.label === "Project" && showProjectMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg shadow-lg z-50">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                    New Project
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                    Open Project
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;