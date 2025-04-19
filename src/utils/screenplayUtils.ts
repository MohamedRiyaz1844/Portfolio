import {
    Film,
    Clapperboard,
    User,
    Quote,
    MessageSquareText,
    ArrowRightLeft,
    Camera,
  } from "lucide-react";
  
  export const screenplayElements = [
    { label: "Scene Heading", type: "scene_heading", icon: Film, shortcut: "1" },
    { label: "Action", type: "action", icon: Clapperboard, shortcut: "2" },
    { label: "Character", type: "character", icon: User, shortcut: "3" },
    { label: "Parenthetical", type: "parenthetical", icon: Quote, shortcut: "4" },
    { label: "Dialogue", type: "dialogue", icon: MessageSquareText, shortcut: "5" },
    { label: "Transition", type: "transition", icon: ArrowRightLeft, shortcut: "6" },
    { label: "Shot", type: "shot", icon: Camera, shortcut: "7" },
  ];
  
  export const getTemplate = (type: string) => {
    switch (type) {
      case "scene_heading":
        return "INT./EXT. LOCATION - DAY/NIGHT\n\n";
      case "action":
        return "Action description goes here...\n";
      case "character":
        return "CHARACTER NAME\n";
      case "parenthetical":
        return "(emotion/description)\n";
      case "dialogue":
        return "Character dialogue goes here...\n";
      case "transition":
        return "CUT TO:\n";
      case "shot":
        return "ANGLE ON:\n";
      default:
        return "";
    }
  };