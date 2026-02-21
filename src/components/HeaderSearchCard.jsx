import React from "react";

export default function HeaderSearchCard({ item, index }) {
  return (
    <li
      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 cursor-pointer
        opacity-0 translate-y-[-6px]"
      style={{
        animation: `searchCardIn 0.25s ease forwards`,
        animationDelay: `${index * 50}ms`,
      }}
    >
      <div className="w-14 h-14 flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[14px] font-medium text-gray-900 truncate">
          {item.name}
        </span>
        <span className="text-[12px] text-gray-400">
          {item.price.toLocaleString()} ₸
        </span>
      </div>

      <span
        className={`text-[11px] flex-shrink-0 px-2 py-1 rounded-full ${
          item.inStock
            ? "text-green-600 bg-green-50"
            : "text-gray-400 bg-gray-100"
        }`}
      >
        {item.inStock ? "В наличии" : "Нет"}
      </span>

      <style>{`
        @keyframes searchCardIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </li>
  );
}
