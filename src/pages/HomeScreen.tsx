// src/pages/HomeScreen.tsx

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Settings,
  HelpCircle,
  FilePlus,
  FolderOpen,
  Clock,
  Sun,
  Moon,
} from "lucide-react";

const recentProjects = [
  { name: "Sunset Script", lastOpened: "April 15, 2025" },
  { name: "Dream Chaser", lastOpened: "April 10, 2025" },
];

const HomeScreen: React.FC = () => {
  // Initialize dark mode state based on document <html> class
  const [darkMode, setDarkMode] = useState<boolean>(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(document.documentElement.classList.contains("dark"));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-500">
      {/* Top Header */}
      <header className="flex items-center justify-between px-6 h-16 bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700 transition-colors duration-500">
        <h1 className="text-2xl font-bold">🎬 Dream Draw</h1>
        <div className="flex gap-3">
          <Button variant="ghost">
            <HelpCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" onClick={toggleTheme}>
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Content Area with Sidebar and Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 p-4 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
          <nav>
            <ul className="space-y-4">
              <li>
                <Button variant="ghost" className="w-full text-left">
                  Dashboard
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full text-left">
                  New Screenplay
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full text-left">
                  Projects
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full text-left">
                  Settings
                </Button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto transition-colors duration-500">
          <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Welcome to Dream Draw</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Where Stories Begin ✨
            </p>
          </section>

          <section className="mb-10">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="px-6 py-3 text-lg">
                <FilePlus className="w-5 h-5 mr-2" />
                New Screenplay
              </Button>
              <Button className="px-6 py-3 text-lg">
                <FolderOpen className="w-5 h-5 mr-2" />
                Open Project
              </Button>
              <Button className="px-6 py-3 text-lg">
                <Clock className="w-5 h-5 mr-2" />
                Continue Last Work
              </Button>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-4">🧾 Recent Projects</h3>
            <ul className="space-y-3">
              {recentProjects.map((project, index) => (
                <li
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-500"
                >
                  <div className="font-semibold">{project.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Last opened: {project.lastOpened}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="text-center p-4 bg-gray-100 dark:bg-gray-800 border-t dark:border-gray-700 transition-colors duration-500">
        Dream Draw v1.0.0 – Made with ❤️ by TechBros
      </footer>
    </div>
  );
};

export default HomeScreen;