import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import bgImage1 from "../assets/img_bg1.png";
import bgImage2 from "../assets/img_bg2.jpg";

export default function Carusel({ className }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const slides = [
    {
      id: 1,
      image: bgImage1,
      title: "Гастрономия в деталях. <br /> Подарки к вашему заказу",
      description:
        "Получайте коллекционные роллы и напитки при заказе через наше приложение. Мы ценим ваш вкус и время.",
      buttonText: "В каталог",
    },
    {
      id: 2,
      image: bgImage2,
      title: "Искусство паузы. <br /> Авторский кофе и чай",
      description:
        "Откройте для себя баланс аромата и эстетики. Идеальное дополнение к вашему дню в каждой чашке.",
      buttonText: "Выбрать напиток",
    },
  ];

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isActive, slides.length]);

  return (
    <section className={`relative w-full overflow-hidden ${className}`}>
      <div
        onMouseEnter={() => setIsActive(false)}
        onMouseLeave={() => setIsActive(true)}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <article
            key={slide.id}
            className="min-w-full h-[240px] sm:h-[340px] md:h-[420px] lg:h-[500px] xl:h-[600px] bg-cover bg-no-repeat bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="flex justify-center items-center px-4 sm:px-8 md:pr-10 max-w-[1400px] gap-4 w-full">
              <div className="flex-1">
                <h1
                  className="text-[18px] sm:text-[24px] md:text-[32px] lg:text-[45px] font-bold leading-tight"
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                />
                <p className="mt-2 md:mt-4 font-medium text-[10px] sm:text-[13px] md:text-base max-w-2xl hidden sm:block opacity-90">
                  {slide.description}
                </p>
                <Link to="/catalog">
                  <button className="font-semibold px-6 sm:px-8 py-2 sm:py-4 bg-black rounded-xl text-white mt-4 md:mt-8 text-[12px] sm:text-sm md:text-base transition-all hover:bg-zinc-800 cursor-pointer">
                    {slide.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 md:h-3 md:w-3 rounded-full border border-black transition-all cursor-pointer ${
              currentIndex === index
                ? "bg-black scale-110"
                : "bg-transparent opacity-50"
            }`}
          />
        ))}
      </nav>
    </section>
  );
}
