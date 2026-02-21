import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import HeaderSearchCard from "./HeaderSearchCard";

export default function HeaderSearch({ results, query }) {
  const [visible, setVisible] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (query) {
      setRendered(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const timer = setTimeout(() => setRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [query]);

  if (!rendered) return null;

  return (
    <div
      className="absolute top-full left-0 w-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-2xl z-[200] border border-gray-100 mt-2 overflow-hidden"
      style={{
        maxHeight: visible ? "400px" : "0px",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scaleY(1)"
          : "translateY(-8px) scaleY(0.97)",
        transformOrigin: "top",
        transition:
          "max-height 0.3s ease, opacity 0.25s ease, transform 0.25s ease",
      }}
    >
      {results.length > 0 ? (
        <ul className="overflow-y-auto max-h-[400px]">
          {results.map((item, index) => (
            <HeaderSearchCard key={item.id} item={item} index={index} />
          ))}
        </ul>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-10 gap-3 text-gray-400"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-4px)",
            transition: "opacity 0.2s ease 0.1s, transform 0.2s ease 0.1s",
          }}
        >
          <Search className="w-8 h-8" />
          <p className="text-sm">Ничего не найдено</p>
        </div>
      )}
    </div>
  );
}
