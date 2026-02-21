import React, { useState, useContext } from "react";
import { Heart, X } from "lucide-react";

import ThemeContext from "../../context";

export default function CatalogItem({ item }) {
  const [countSu, setCountSu] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const { favorites, toggleFavorite, addToCart } = useContext(ThemeContext);
  const isLiked = favorites.some((fav) => fav.id === item.id);
  const increment = () => setCountSu((prev) => prev + 1);
  const decrement = () => setCountSu((prev) => (prev > 1 ? prev - 1 : 1));
  const handleAddToCart = () => {
    if (item.inStock) {
      addToCart({ ...item, count: countSu });
      setCountSu(1);
      setIsModal(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[100] flex justify-center items-center bg-black/40 backdrop-blur transition-all duration-300 p-4
        ${isModal ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsModal(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-[1200px] bg-white shadow-2xl transition-all duration-300 transform overflow-auto
          max-h-[90vh] rounded-2xl
          ${isModal ? "translate-y-0" : "-translate-y-full"}`}
        >
          <button
            onClick={() => setIsModal(false)}
            className="absolute top-4 right-5 text-3xl text-gray-300 hover:text-black cursor-pointer z-10"
          >
            &times;
          </button>
          <h1 className="p-5 md:p-7 border-b border-black/10 text-xl md:text-2xl w-full flex justify-start px-6 md:px-12">
            {item.name}
          </h1>
          <div className="flex flex-col md:flex-row min-h-[300px] md:h-[calc(100%-88px)]">
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
              <img
                src={item.image}
                alt={item.name}
                className="max-w-full max-h-[220px] md:max-h-full object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col items-start border-t md:border-t-0 md:border-l border-black/5">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <span className="text-[16px] md:text-[20px] text-green-500 font-light">
                  В наличии
                </span>
              </div>
              <div className="text-[32px] md:text-[48px] font-medium text-[#1a1a1a] mb-6 md:mb-8">
                {item.price.toLocaleString()} тенге
              </div>
              <div className="flex items-center gap-3 md:gap-5 mb-6 md:mb-10 flex-wrap">
                <div className="flex w-[110px] md:w-[130px] h-[48px] md:h-[55px] border border-black/10 rounded-2xl overflow-hidden">
                  <button
                    onClick={decrement}
                    className="flex-1 text-2xl text-gray-400 hover:text-black transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <div className="flex-[1.2] flex items-center justify-center text-lg text-gray-600 border-x border-black/10">
                    {countSu}
                  </div>
                  <button
                    onClick={increment}
                    className="flex-1 text-2xl text-gray-400 hover:text-black transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex items-center justify-center gap-3 px-6 md:px-8 h-[48px] md:h-[55px] rounded-2xl text-white font-bold text-sm transition-all ${item.inStock ? "bg-black hover:bg-black/80 cursor-pointer" : "bg-gray-200 cursor-not-allowed"}`}
                  disabled={!item.inStock}
                >
                  <span className="text-base md:text-xl font-semibold">
                    В корзину
                  </span>
                </button>
                <button
                  onClick={() => toggleFavorite(item)}
                  className="text-2xl cursor-pointer transition-colors group/heart"
                >
                  <Heart
                    className={`transition-all ${isLiked ? "text-red-500 fill-red-500" : "text-gray-400 group-hover:text-red-500"}`}
                  />
                </button>
              </div>
              <p className="text-[#333] text-base md:text-lg font-light">
                {item.description || "с копченым угрем и кунжутом"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="group relative flex flex-col bg-white w-full transition-all duration-300 hover:shadow-2xl border border-black/5 rounded-2xl">
        <button
          onClick={() => toggleFavorite(item)}
          className={`absolute top-4 left-1/2 -translate-x-1/2 z-30 text-2xl cursor-pointer transition-all duration-300 
          ${isLiked ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        >
          <Heart
            className={`transition-all duration-300 ${isLiked ? "text-red-500 fill-red-500" : "text-gray-300 hover:text-red-500 hover:scale-110"}`}
          />
        </button>
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
          <img
            onClick={() => setIsModal(true)}
            src={item.image}
            alt={item.name}
            className="cursor-pointer w-full h-full object-cover transition-transform duration-700"
          />
        </div>
        <div className="p-3 md:p-5 flex flex-col items-start bg-white z-20">
          <h3 className="text-[13px] md:text-[16px] text-[#333] font-medium mb-2 md:mb-3 transition-all duration-300 group-hover:text-black line-clamp-2">
            {item.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`w-1.5 h-1.5 rounded-full ${item.inStock ? "bg-green-500" : "bg-gray-400"}`}
            ></span>
            <span
              className={`text-[11px] md:text-[13px] ${item.inStock ? "text-green-500" : "text-gray-400"}`}
            >
              {item.inStock ? "В наличии" : "Нет в наличии"}
            </span>
          </div>
          <div className="text-[16px] md:text-[20px] font-bold text-[#1d1d1f]">
            {item.price.toLocaleString()} ₸
          </div>
        </div>
        <div className="absolute top-full left-0 w-full flex h-[44px] md:h-[52px] shadow-xl opacity-0 translate-y-[-5px] pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-30 bg-white rounded-b-2xl overflow-hidden">
          <div className="flex w-[100px] md:w-[120px] items-center bg-[#f8f8f8]">
            <button
              onClick={decrement}
              className="cursor-pointer flex-1 h-full text-gray-400 hover:text-black"
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-medium text-gray-600">
              {countSu}
            </span>
            <button
              onClick={increment}
              className="cursor-pointer flex-1 h-full text-gray-400 hover:text-black"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex-1 h-full text-white text-[9px] md:text-[11px] font-bold uppercase tracking-[1px] transition-colors ${item.inStock ? "bg-black hover:bg-black/80 cursor-pointer" : "bg-gray-200 cursor-not-allowed text-gray-400"}`}
            disabled={!item.inStock}
          >
            {item.inStock ? "В корзину" : "Недоступно"}
          </button>
        </div>
      </div>
    </>
  );
}
