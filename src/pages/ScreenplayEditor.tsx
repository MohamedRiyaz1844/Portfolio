import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Layers,
  Calendar,
  Share,
  Printer,
  Send,
} from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { screenplayElements, getTemplate } from "../utils/screenplayUtils";

const ScreenplayEditor: React.FC = () => {
  const { projectId } = useParams();
  const [script, setScript] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [characters, setCharacters] = useState<string[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);

  const insertElement = (type: string) => {
    const template = getTemplate(type);
    const range = window.getSelection()?.getRangeAt(0);
    if (range) {
      range.deleteContents();
      range.insertNode(document.createTextNode(template));
      range.collapse(false);
    }
    setScript(editorRef.current?.innerHTML || "");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const isModifier = isMac ? e.metaKey : e.ctrlKey;

    if (isModifier && e.key >= "1" && e.key <= "7") {
      e.preventDefault();
      const type = screenplayElements[parseInt(e.key) - 1].type;
      handleElement(type);
    }
  };

  const handleElement = (type: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    let content = "";
    switch (type) {
      case "sceneHeading":
        content = suggestSceneHeading();
        break;
      case "action":
        content = "<p class='action'></p>";
        break;
      case "character":
        content = suggestCharacter();
        break;
      case "parenthetical":
        content = "<p class='parenthetical'>( )</p>";
        break;
      case "dialogue":
        content = "<p class='dialogue'></p>";
        break;
      case "transition":
        content = "<p class='transition'></p>";
        break;
      case "shot":
        content = "<p class='shot'></p>";
        break;
    }
    editor.innerHTML += content;
    setScript(editor.innerHTML);
  };

  const suggestSceneHeading = () => {
    const selection = window.getSelection()?.toString() || "";
    let content = "<p class='sceneHeading'>";
    if (!selection) content += "INT. - ";
    else if (selection.toUpperCase() === "INT" || selection.toUpperCase() === "EXT") {
      content += selection.toUpperCase() + ". - ";
    } else {
      content += "INT. - ";
    }
    if (locations.length > 0) content += `<span contenteditable='false' class='suggestion'>${locations[0]}</span> - `;
    content += "<span contenteditable='false' class='suggestion'>DAY</span></p>";
    return content;
  };

  const suggestCharacter = () => {
    const content = `<p class='character'>${characters.length > 0 ? characters[0] : ""}</p>`;
    return content;
  };

  const updateMemory = (type: string, value: string) => {
    value = value.trim().toUpperCase();
    if (value) {
      if (type === "location" && !locations.includes(value)) setLocations([...locations, value]);
      if (type === "character" && !characters.includes(value)) setCharacters([...characters, value]);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const text = target.innerText.trim();
    const className = target.className;

    if (className.includes("sceneHeading")) {
      if (text.includes("-") && !text.endsWith("-")) {
        const parts = text.split("-");
        if (parts.length === 2) updateMemory("location", parts[1]);
        if (parts.length === 3) updateMemory("location", parts[1]);
      }
    } else if (className.includes("character")) {
      updateMemory("character", text);
    }
    setScript(editorRef.current?.innerHTML || "");
  };

  const exportPDF = () => {
    const MyDoc = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <Text>{script.replace(/<[^>]+>/g, "")}</Text>
          </View>
        </Page>
      </Document>
    );
    // Simplified PDF export (requires react-pdf renderer setup)
    // In a real app, use pdf.render() and save with file-saver
  };

  const exportHTML = () => {
    const htmlContent = `<html><body>${script}</body></html>`;
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    saveAs(blob, "screenplay.html");
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.focus();
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Tooltip.Provider>
      <div className="h-full flex bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Left Sidebar */}
        <div className="w-16 bg-white dark:bg-gray-800 p-4 border-r border-gray-300 dark:border-gray-700 flex flex-col justify-between">
          <div className="space-y-4">
            {[
              { icon: FileText, label: "Scene Heading", type: "sceneHeading" },
              { icon: Layers, label: "Action", type: "action" },
              { icon: Calendar, label: "Character", type: "character" },
            ].map(({ icon: Icon, label, type }, index) => (
              <Tooltip.Root key={index}>
                <Tooltip.Trigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-center"
                    onClick={() => handleElement(type)}
                  >
                    <Icon className="w-4 h-4 opacity-100" />
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Content className="bg-black text-white text-sm p-2 rounded-md shadow-lg">
                  {label}
                </Tooltip.Content>
              </Tooltip.Root>
            ))}
          </div>
          <div className="space-y-2 pt-10 border-t border-gray-300 dark:border-gray-700">
            {[
              { icon: Share, label: "Parenthetical", type: "parenthetical" },
              { icon: Printer, label: "Dialogue", type: "dialogue" },
              { icon: Send, label: "Transition", type: "transition" },
              { icon: Send, label: "Shot", type: "shot" },
            ].map(({ icon: Icon, label, type }, index) => (
              <Tooltip.Root key={index}>
                <Tooltip.Trigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center"
                    onClick={() => handleElement(type)}
                  >
                    <Icon className="w-4 h-4 opacity-100" />
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Content className="bg-black text-white text-sm p-2 rounded-md shadow-lg">
                  {label}
                </Tooltip.Content>
              </Tooltip.Root>
            ))}
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={exportPDF}
            >
              <Printer className="w-4 h-4 opacity-100" />
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={exportHTML}
            >
              <Share className="w-4 h-4 opacity-100" />
            </Button>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col px-6 py-6">
          <div className="flex-1 flex justify-center overflow-hidden">
            <div
              ref={editorRef}
              contentEditable
              className="bg-white dark:bg-gray-800 w-full max-w-[800px] rounded-2xl shadow-xl flex flex-col p-10 outline-none font-mono text-sm leading-relaxed"
              onInput={handleInput}
              dangerouslySetInnerHTML={{ __html: script }}
            />
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Courier",
    fontSize: 12,
  },
});

export default ScreenplayEditor;