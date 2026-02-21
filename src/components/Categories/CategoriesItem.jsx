import React from "react";
import { Link } from "react-router-dom";

export default function CategoriesItem({ img, title }) {
  return (
    <div className="flex flex-col items-center cursor-pointer">
      <div className="h-48 sm:h-64 md:h-80 lg:h-96 w-full overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <Link to="/catalog">
          <img
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            src={img}
            alt={title}
          />
        </Link>
      </div>
      <h1 className="mt-3 text-base md:text-xl font-semibold text-black/80">
        {title}
      </h1>
    </div>
  );
}
