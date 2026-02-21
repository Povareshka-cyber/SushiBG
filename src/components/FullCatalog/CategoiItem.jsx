import React from "react";

export default function CategoiItem({ item, catalogList }) {
  const foundItem =
    item.slug === "all"
      ? catalogList.find((el) => el.category)
      : catalogList.find((el) => el.category === item.slug);

  return (
    <div
      className="group flex flex-col items-center w-full h-full cursor-pointer transition-all duration-300 p-3 md:p-5 
      border border-black/10 bg-white rounded-2xl
      hover:shadow-2xl hover:scale-105"
    >
      <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
        {foundItem && (
          <img
            src={foundItem.image}
            alt={item.name}
            className="w-full h-full object-contain transition-transform duration-500"
          />
        )}
      </div>
      <h3 className="mt-3 text-[14px] md:text-[18px] text-[#1a1a1a] font-normal text-center leading-snug">
        {item.name}
      </h3>
    </div>
  );
}
