import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  FolderOpen,
  History,
  ClipboardList,
} from "lucide-react";

type Project = {
  name: string;
  lastOpened: string;
};

const HomeScreen: React.FC = () => {
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentProjects = async () => {
      setLoading(true);
      try {
        const dataFromDB: Project[] = []; // Replace with actual fetch logic
        setRecentProjects(dataFromDB);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentProjects();
  }, []);

  return (
    <div className="flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-500">
      <main className="flex-1 px-4 sm:px-8 lg:px-16 py-12 max-w-4xl mx-auto">
        {/* Welcome Header */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2 tracking-tight">Welcome to Dream Draw</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Where Stories Begin ✨
          </p>
        </section>

        {/* Primary Actions */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="px-6 py-3 text-base font-medium shadow-md">
              <PlusCircle className="w-5 h-5 mr-2" />
              New Project
            </Button>
            <Button className="px-6 py-3 text-base font-medium shadow-md">
              <FolderOpen className="w-5 h-5 mr-2" />
              Open Project
            </Button>
            <Button className="px-6 py-3 text-base font-medium shadow-md">
              <History className="w-5 h-5 mr-2" />
              Resume Last Project
            </Button>
          </div>
        </section>

        {/* Recent Projects */}
        <section>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 justify-center">
            <ClipboardList className="w-6 h-6" />
            Recent Projects
          </h3>
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
          ) : recentProjects.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No recent projects found.</p>
          ) : (
            <ul className="space-y-4">
              {recentProjects.map((project, index) => (
                <li
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl px-6 py-4 shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <div className="font-semibold text-lg">{project.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Last opened: {project.lastOpened}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomeScreen;
