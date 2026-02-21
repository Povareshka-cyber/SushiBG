import React from "react";
import { X } from "lucide-react";

export default function CartItem({ item, updateCount, deleteItemCart }) {
  return (
    <div className="flex items-center justify-between py-5 border-b border-gray-100">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-16 h-14 sm:w-20 sm:h-16 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <h3 className="text-[13px] sm:text-[15px] font-medium text-black leading-tight line-clamp-2">
            {item.name}
          </h3>
          <span className="text-[14px] sm:text-[16px] font-bold text-black">
            {item.price.toLocaleString()} тг
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 ml-3 flex-shrink-0">
        <button
          onClick={() => updateCount(item.id, 1)}
          className="text-gray-400 hover:text-black cursor-pointer text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          +
        </button>
        <span className="text-base font-semibold text-black w-6 text-center">
          {item.count}
        </span>
        <button
          onClick={() =>
            item.count > 1 ? updateCount(item.id, -1) : deleteItemCart(item.id)
          }
          className="text-gray-400 hover:text-black cursor-pointer text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          –
        </button>
      </div>
    </div>
  );
}
