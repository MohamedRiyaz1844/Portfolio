import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Clapperboard,
  User,
  MessageSquareText,
  Quote,
  ArrowRightLeft,
} from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip"; // Import Tooltip from Radix UI

const screenplayElements = [
  { label: "Action", type: "action", icon: Clapperboard, shortcut: "1" },
  { label: "Character", type: "character", icon: User, shortcut: "2" },
  { label: "Dialogue", type: "dialogue", icon: MessageSquareText, shortcut: "3" },
  { label: "Parenthetical", type: "parenthetical", icon: Quote, shortcut: "4" },
  { label: "Transition", type: "transition", icon: ArrowRightLeft, shortcut: "5" },
];

const getTemplate = (type: string) => {
  switch (type) {
    case "action":
      return "INT. LOCATION - DAY\n\n";
    case "character":
      return "CHARACTER NAME\n";
    case "dialogue":
      return "Character dialogue goes here...\n";
    case "parenthetical":
      return "(angrily)\n";
    case "transition":
      return "CUT TO:\n";
    default:
      return "";
  }
};

const ScreenplayEditor: React.FC = () => {
  const { projectId } = useParams();
  const [script, setScript] = useState("");

  const insertElement = (type: string) => {
    const template = getTemplate(type);
    setScript((prev) => prev + template);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isModifier = isMac ? e.metaKey : e.ctrlKey;

      if (isModifier) {
        const matched = screenplayElements.find((el) => e.key === el.shortcut);
        if (matched) {
          e.preventDefault();
          insertElement(matched.type);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Tooltip.Provider> {/* Wrap with TooltipProvider */}
      <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-6 overflow-y-auto">
        {/* Top Bar with Icons and Tooltips */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {screenplayElements.map(({ type, label, icon: Icon, shortcut }) => (
            <Tooltip.Root key={type}>
              <Tooltip.Trigger>
                <Button
                  onClick={() => insertElement(type)}
                  className="w-10 h-10 p-2 shadow-md"
                  variant="outline"
                >
                  <Icon className="w-5 h-5" />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content className="bg-black text-white text-sm p-2 rounded-md shadow-lg">
                {`${label} (Ctrl + ${shortcut})`}
              </Tooltip.Content>
            </Tooltip.Root>
          ))}
        </div>

        {/* Centered Writing Sheet */}
        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-800 w-full max-w-[800px] min-h-[90vh] p-10 rounded-2xl shadow-xl">
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Start writing your screenplay here..."
              className="w-full h-full bg-transparent outline-none resize-none font-mono text-sm leading-relaxed"
              style={{ minHeight: "70vh" }}
            />
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  );
};

export default ScreenplayEditor;
