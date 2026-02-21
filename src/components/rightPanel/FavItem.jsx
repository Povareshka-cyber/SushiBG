import React, { useContext } from "react";
import { X } from "lucide-react";
import ThemeContext from "../../context";

export default function FavItem({ item }) {
  const { toggleFavorite } = useContext(ThemeContext);

  return (
    <div className="group relative flex items-center justify-between py-6 border-b border-gray-100">
      <div className="flex items-center gap-4">
        <div className="w-24 h-20 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-[15px] font-medium text-black">{item.name}</h3>
          <span className="text-[16px] font-bold text-black">
            {item.price.toLocaleString()} тенге
          </span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button
          onClick={() => toggleFavorite(item)}
          className="text-gray-300 hover:text-black transition-colors cursor-pointer p-2"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
