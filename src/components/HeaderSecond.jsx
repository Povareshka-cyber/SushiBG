import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Languages,
  LogIn,
  Search,
  Phone,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import HeaderSearch from "./HeaderSearch";

export default function HeaderSecond({ catalogList = [] }) {
  const [copied, setCopied] = useState(false);
  const [isVis, setIsVis] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);

  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const phoneRef = useRef(null);

  const handleCopy = (text) => {
    const cleanNumber = text.replace(/\s+/g, "");
    navigator.clipboard.writeText(cleanNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  useEffect(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) {
      setSearchResults([]);
      return;
    }
    const filtered = catalogList.filter((item) =>
      item.name.toLowerCase().includes(trimmed),
    );
    setSearchResults(filtered);
  }, [searchQuery, catalogList]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target)
      ) {
        setIsSearchFocused(false);
        setSearchQuery("");
      }
      if (phoneRef.current && !phoneRef.current.contains(e.target)) {
        setPhoneDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showDropdown = isSearchFocused && searchQuery.trim().length > 0;

  return (
    <>
      <section className="hidden md:flex w-full justify-center border-b border-black/10">
        <div className="flex w-full justify-between max-w-[1400px] px-4">
          <div className="flex items-center">
            <MapPin className="h-5 text-black/70 flex-shrink-0" />
            <p className="text-[12px] text-black/50 hidden lg:block">
              г. Алматы, мк-р Алмагуль 18а, ул. Жарокова, уг. Дунаевского
            </p>
            <p className="text-[12px] text-black/50 lg:hidden">г. Алматы</p>
          </div>
          <div className="flex">
            <button
              onMouseEnter={() => setIsVis(true)}
              onMouseLeave={() => setIsVis(false)}
              className="p-3 bg-black flex items-center cursor-pointer transition-all duration-500 rounded-2xl group"
            >
              <div className="flex justify-center items-center gap-2">
                <Languages className="text-white" />
                <h2 className="text-white font-bold">RU</h2>
              </div>
              <div
                className={`flex items-center justify-center transition-all duration-300 ease-in-out overflow-hidden ${
                  isVis
                    ? "max-w-[200px] opacity-100 ml-4"
                    : "max-w-0 opacity-0 ml-0"
                }`}
              >
                <ul className="flex gap-3 text-white text-[10px] whitespace-nowrap items-center">
                  <li className="font-bold hover:underline">RU</li>
                  <li className="hover:underline">KZ</li>
                  <li className="hover:underline">EN</li>
                </ul>
              </div>
            </button>
            <button className="p-3 pr-0 flex items-center gap-2 cursor-pointer">
              <LogIn />
              <h2>Войти</h2>
            </button>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center">
        <div className="flex w-full justify-between max-w-[1400px] py-3 items-center px-4">
          <div className="flex items-center justify-between gap-3">
            <Link to="/">
              <img className="h-14 md:h-20" src={Logo} alt="logo" />
            </Link>
            <div className="w-[1px] h-[25px] bg-black/20 hidden md:block"></div>
            <p className="text-[12px] text-black/50 hidden md:block">
              Ресторан, Суши бар
            </p>
          </div>

          <div
            className="hidden md:block relative flex-1 max-w-[800px] mx-4"
            ref={searchRef}
          >
            <div className="flex py-2 px-4 rounded-2xl bg-black/5 items-center border border-black/5 focus-within:border-black/20 transition-colors">
              <input
                className="text-[12px] text-black bg-transparent outline-none flex-1"
                type="text"
                placeholder="Поиск по сайту"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              {searchQuery ? (
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchFocused(false);
                  }}
                >
                  <X className="text-gray-400 h-[18px] hover:text-black transition-colors" />
                </button>
              ) : (
                <Search className="text-black/50 h-[20px]" />
              )}
            </div>
            <HeaderSearch
              results={searchResults}
              query={showDropdown ? searchQuery : ""}
            />
          </div>

          <div
            className="hidden md:flex items-center gap-2 relative"
            ref={phoneRef}
          >
            <div className="flex flex-col items-end">
              <div className="flex gap-2 items-center">
                <Phone className="text-black/70" />
                <h1
                  onClick={() => handleCopy("8 707 33 45 238")}
                  className="font-bold transition-all duration-500 hover:text-black/60 cursor-pointer"
                >
                  8 707 33 45 238
                </h1>
              </div>
              <h2 className="text-sm text-black/50">Call-центр</h2>
            </div>
            <div className="relative py-2">
              <button
                onClick={() => setPhoneDropdownOpen(!phoneDropdownOpen)}
                className="cursor-pointer"
              >
                <ChevronDown
                  className={`transition-all duration-300 text-black ${
                    phoneDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {phoneDropdownOpen && (
                <div
                  className="absolute top-full right-0 mt-2 flex flex-col justify-center items-start gap-4 p-5 min-w-[240px]
                    bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl z-[100] border border-gray-100"
                >
                  <div className="flex flex-col">
                    <h1
                      onClick={() => handleCopy("+7 707 077 7777")}
                      className="hover:text-black/60 transition-all duration-300 cursor-pointer font-bold text-gray-900 text-[15px] tracking-tight"
                    >
                      +7 707 077 7777
                    </h1>
                    <p className="text-[12px] text-gray-400 font-medium">
                      Call-центр
                    </p>
                  </div>
                  <div className="h-[1px] bg-gray-100 w-full"></div>
                  <div className="flex flex-col">
                    <h1
                      onClick={() => handleCopy("+7 707 077 7777")}
                      className="hover:text-black/60 transition-all duration-300 cursor-pointer font-bold text-gray-900 text-[15px] tracking-tight"
                    >
                      +7 707 077 7777
                    </h1>
                    <p className="text-[12px] text-gray-400 font-medium leading-tight">
                      Отдел контроля качества
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <button
              className="cursor-pointer p-2"
              onClick={() => {
                setMobileSearchOpen(!mobileSearchOpen);
                setMobileMenuOpen(false);
              }}
            >
              <Search className="text-gray-600 h-6 w-6" />
            </button>
            <a className="cursor-pointer p-2" href="tel:87073345238">
              <Phone className="text-black/70 h-6 w-6" />
            </a>
            <button
              className="cursor-pointer p-2"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setMobileSearchOpen(false);
              }}
            >
              {mobileMenuOpen ? (
                <X className="text-gray-600 h-6 w-6" />
              ) : (
                <Menu className="text-gray-600 h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </section>

      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3" ref={mobileSearchRef}>
          <div className="relative">
            <div className="flex py-3 px-4 rounded-2xl bg-black/5 items-center border border-black/5">
              <input
                className="text-[14px] text-black bg-transparent outline-none flex-1"
                type="text"
                placeholder="Поиск по сайту"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              {searchQuery ? (
                <button
                  className="cursor-pointer p-1"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="text-gray-400 h-5 hover:text-black transition-colors" />
                </button>
              ) : (
                <Search className="text-black/50 h-5" />
              )}
            </div>
            <HeaderSearch
              results={searchResults}
              query={showDropdown ? searchQuery : ""}
            />
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg px-5 py-5 flex flex-col gap-5 z-50">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 text-black/70 flex-shrink-0" />
            <p className="text-[13px] text-black/50">
              г. Алматы, мк-р Алмагуль 18а
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-black/70 h-5 w-5" />
            <a href="tel:87073345238" className="font-bold text-base">
              8 707 33 45 238
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-black/70 h-5 w-5" />
            <a href="tel:87070777777" className="font-bold text-base">
              +7 707 077 7777
            </a>
            <span className="text-xs text-gray-400">Контроль качества</span>
          </div>
          <div className="flex gap-4 items-center">
            <button className="text-base font-bold text-black cursor-pointer">
              RU
            </button>
            <button className="text-base text-black/50 cursor-pointer">
              KZ
            </button>
            <button className="text-base text-black/50 cursor-pointer">
              EN
            </button>
          </div>
          <button className="flex items-center gap-3 text-base cursor-pointer font-medium">
            <LogIn className="h-5 w-5" />
            Войти
          </button>
        </div>
      )}

      <div className="py-4 bg-black text-white font-medium w-full flex justify-center">
        <Link to="/catalog">
          <h1 className="cursor-pointer text-sm md:text-base tracking-wide">
            Меню
          </h1>
        </Link>
      </div>
    </>
  );
}
