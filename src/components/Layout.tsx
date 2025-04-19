import React from "react";
import Header from "./Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen"> {/* Full viewport height */}
      <Header />
      <main className="flex-1 overflow-hidden"> {/* Take remaining space, no overflow */}
        {children}
      </main>
    </div>
  );
};

export default Layout;