import React from "react";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout({ cart }) {
  const totalSum = cart.reduce((acc, item) => acc + item.price * item.count, 0);
  const navigate = useNavigate();

  return (
    <div className="bg-[#f8f8f8] min-h-screen pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 pt-6 sm:pt-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-400 hover:text-black mb-6 sm:mb-8 transition-colors text-sm sm:text-base"
        >
          <ChevronLeft size={18} />
          <span>Вернуться в меню</span>
        </Link>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-10 text-[#1a1a1a]">
          Оформление заказа
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
          <div className="flex-1 flex flex-col gap-4 sm:gap-6 w-full">
            <section className="bg-white p-5 sm:p-8 border border-black/5 shadow-sm rounded-2xl">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                Контактные данные
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full h-[50px] sm:h-[55px] border border-black/10 rounded-2xl px-4 focus:border-black/40 outline-none transition-all text-sm sm:text-base"
                />
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="w-full h-[50px] sm:h-[55px] border border-black/10 rounded-2xl px-4 focus:border-black/40 outline-none transition-all text-sm sm:text-base"
                />
              </div>
            </section>

            <section className="bg-white p-5 sm:p-8 border border-black/5 shadow-sm rounded-2xl">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                Адрес доставки
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="Улица"
                  className="w-full h-[50px] sm:h-[55px] border border-black/10 rounded-2xl px-4 focus:border-black/40 outline-none text-sm sm:text-base"
                />
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <input
                    type="text"
                    placeholder="Дом"
                    className="h-[50px] sm:h-[55px] border border-black/10 rounded-2xl px-3 sm:px-4 focus:border-black/40 outline-none text-sm sm:text-base"
                  />
                  <input
                    type="text"
                    placeholder="Подъезд"
                    className="h-[50px] sm:h-[55px] border border-black/10 rounded-2xl px-3 sm:px-4 focus:border-black/40 outline-none text-sm sm:text-base"
                  />
                  <input
                    type="text"
                    placeholder="Квартира"
                    className="h-[50px] sm:h-[55px] border border-black/10 rounded-2xl px-3 sm:px-4 focus:border-black/40 outline-none text-sm sm:text-base"
                  />
                </div>
              </div>
            </section>
          </div>

          <aside className="w-full lg:w-[400px] lg:sticky lg:top-10">
            <div className="bg-white border border-black/5 shadow-xl p-5 sm:p-8 rounded-2xl">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 pb-4 border-b border-black/5">
                Ваш заказ
              </h2>

              <div className="max-h-[260px] sm:max-h-[300px] overflow-y-auto mb-5 pr-1">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-contain flex-shrink-0"
                          alt=""
                        />
                        <div>
                          <p className="text-sm font-medium leading-tight line-clamp-2">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {item.count} шт.
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-sm flex-shrink-0 ml-2">
                        {(item.price * item.count).toLocaleString()} ₸
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm text-center py-6">
                    Корзина пуста
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 mb-6 pt-4 border-t border-black/5">
                <div className="flex justify-between items-end">
                  <span className="text-base sm:text-lg font-bold">
                    Итого к оплате:
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-black">
                    {totalSum.toLocaleString()} ₸
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert("Заказ успешно оформлен!");
                  navigate("/");
                }}
                className="cursor-pointer w-full bg-black hover:bg-black/80 text-white py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all active:scale-[0.98]"
              >
                Подтвердить заказ
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
