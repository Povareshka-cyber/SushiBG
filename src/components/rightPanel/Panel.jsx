import React, { useContext } from "react";
import { ShoppingCart, Heart, X } from "lucide-react";
import CartItem from "./cartItem";
import FavItem from "./FavItem";
import ThemeContext from "../../context";
import { Link } from "react-router-dom";

export default function Panel({
  favorites,
  setCart,
  cart,
  isCart,
  isFavorites,
  setIsCart,
  setIsFavorites,
  deleteAllCart,
}) {
  const isOpen = isCart || isFavorites;
  const { deleteAllFavorites } = useContext(ThemeContext);

  const deleteItemCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateCount = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, count: Math.max(1, item.count + delta) }
          : item,
      ),
    );
  };

  const summaCart = cart.reduce(
    (allPrice, item) => allPrice + item.count * item.price,
    0,
  );
  const totalItems = cart.reduce((acc, item) => acc + item.count, 0);

  return (
    <>
      <div
        className={`fixed inset-0 z-[99999] bg-black/40 backdrop-blur transition-opacity duration-300 
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        onClick={() => {
          setIsCart(false);
          setIsFavorites(false);
        }}
      />

      <div
        className={`fixed right-0 top-0 h-screen flex items-start z-[1000999] transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-[calc(100%-56px)] md:translate-x-[calc(100%-68px)]"}`}
      >
        <div className="mt-16 md:mt-24 h-fit rounded-l-3xl border border-gray-200 border-r-0 bg-white p-3 md:p-4 flex flex-col items-center gap-3 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.08)]">
          <button
            onClick={() => {
              setIsCart(!isCart);
              setIsFavorites(false);
            }}
            className={`p-2 md:p-3 rounded-2xl border border-gray-200 cursor-pointer transition-all duration-300 group 
            ${isCart ? "bg-black border-black" : "bg-white hover:bg-black"}`}
          >
            <ShoppingCart
              className={`w-5 h-5 transition-all duration-300 ${isCart ? "text-white" : "text-gray-400 group-hover:text-white"}`}
            />
          </button>
          <button
            onClick={() => {
              setIsFavorites(!isFavorites);
              setIsCart(false);
            }}
            className={`p-2 md:p-3 rounded-2xl border border-gray-200 cursor-pointer transition-all duration-300 group 
            ${isFavorites ? "bg-black border-black" : "bg-white hover:bg-black"}`}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${isFavorites ? "text-white" : "text-gray-400 group-hover:text-white"}`}
            />
          </button>
        </div>

        <div className="h-full w-[calc(100vw-56px)] sm:w-[400px] md:w-[600px] bg-white shadow-2xl flex flex-col">
          {isCart ? (
            <>
              <div className="flex justify-between items-center p-5 md:p-8 border-b border-gray-100">
                <div className="flex items-baseline gap-3">
                  <h1 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">
                    Ваша корзина
                  </h1>
                  <p className="text-gray-400 text-sm font-medium">
                    {totalItems} товаров
                  </p>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <button
                    onClick={() => deleteAllCart()}
                    className="cursor-pointer text-[10px] uppercase tracking-wider text-gray-400 hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 bg-gray-100 rounded-full px-3 md:px-4 py-2"
                  >
                    <span className="hidden sm:inline">Очистить</span>
                    <X size={14} />
                  </button>
                  <button
                    onClick={() => setIsCart(false)}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-5 md:p-8">
                {cart.length > 0 ? (
                  cart.map((el) => (
                    <CartItem
                      deleteItemCart={deleteItemCart}
                      updateCount={updateCount}
                      item={el}
                      key={el.id}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center mt-20 gap-4">
                    <ShoppingCart size={48} className="text-gray-200" />
                    <p className="text-gray-500">Корзина пуста</p>
                  </div>
                )}
              </div>
              <div className="p-5 md:p-8 border-t border-gray-100 bg-gray-50/50">
                <div className="flex justify-between items-end mb-6">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm uppercase tracking-wider">
                      Итого:
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">
                      {summaCart.toLocaleString()} тг
                    </span>
                  </div>
                  {summaCart < 4000 && (
                    <span className="text-black/60 text-xs md:text-sm font-medium text-right">
                      Добавьте еще на {(4000 - summaCart).toLocaleString()} тг
                    </span>
                  )}
                </div>
                <Link onClick={() => setIsCart(false)} to="/checkout">
                  <button
                    disabled={summaCart < 4000}
                    className={`w-full py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 ${
                      summaCart >= 4000
                        ? "bg-black text-white hover:bg-black/80 cursor-pointer active:scale-[0.98]"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {summaCart >= 4000
                      ? "Оформить заказ"
                      : "Минимальная сумма 4000 тг"}
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center p-5 md:p-8 border-b border-gray-100">
                <div className="flex items-baseline gap-3">
                  <h1 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">
                    Избранное
                  </h1>
                  <p className="text-gray-400 text-sm font-medium">
                    {favorites.length} товаров
                  </p>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <button
                    onClick={() => deleteAllFavorites()}
                    className="cursor-pointer text-[10px] uppercase tracking-wider text-gray-400 hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 bg-gray-100 rounded-full px-3 md:px-4 py-2"
                  >
                    <span className="hidden sm:inline">Очистить</span>
                    <X size={14} />
                  </button>
                  <button
                    onClick={() => setIsFavorites(false)}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-5 md:p-8">
                {favorites.length > 0 ? (
                  favorites.map((item) => <FavItem key={item.id} item={item} />)
                ) : (
                  <div className="flex flex-col items-center justify-center mt-20 gap-4">
                    <Heart size={48} className="text-gray-200" />
                    <p className="text-gray-500">
                      Здесь будут ваши любимые роллы...
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
