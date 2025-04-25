import React from 'react';

const Header = () => {
  return (
    <header className="p-4 flex justify-between items-center bg-white shadow-md fixed w-full top-0 z-50">
      <h1 className="text-2xl font-bold text-indigo-600">My Portfolio</h1>
      <nav className="space-x-4">
        <a href="#about" className="text-gray-600 hover:text-indigo-600">About</a>
        <a href="#projects" className="text-gray-600 hover:text-indigo-600">Projects</a>
        <a href="#contact" className="text-gray-600 hover:text-indigo-600">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
