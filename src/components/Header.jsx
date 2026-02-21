import React from "react";
import { Menu, Search, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Header({ visible }) {
  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1000] bg-white flex px-8 py-3 items-center justify-center
      shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)] transition-all duration-500 ease-in-out
      ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav className="flex justify-between w-screen items-center max-w-[1400px]">
        <div id="leftSide" className="flex items-center gap-12">
          <Link to="/">
            <img className="h-16" src={Logo} alt="logo" />
          </Link>
        </div>

        <Link to="/catalog">
          <h1 className="font-semibold text-gray-800">Меню</h1>
        </Link>
        <div id="rightSide" className="flex items-center gap-12">
          <Search className="text-black/40 cursor-pointer hover:text-black transition-colors" />
          <LogIn className="text-black/40 cursor-pointer hover:text-black transition-colors" />
        </div>
      </nav>
    </header>
  );
}
