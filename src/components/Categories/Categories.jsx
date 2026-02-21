import React from "react";
import pizzaImg from "../../assets/pizza.jpg";
import assortiImg from "../../assets/assorti.jpg";
import wingsImg from "../../assets/wings.jpg";
import warmRollsImg from "../../assets/warmRolls.jpg";
import CategoriesItem from "./CategoriesItem";

export default function Categories() {
  const categoriesData = [
    { id: 1, title: "Ассорти", image: assortiImg },
    { id: 2, title: "Теплые роллы", image: warmRollsImg },
    { id: 3, title: "Пицца", image: pizzaImg },
    { id: 4, title: "Крылышки", image: wingsImg },
  ];

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-[1400px]">
        <h1 className="text-2xl md:text-3xl mt-10 md:mt-15 mb-6 md:mb-10 text-left">
          Популярные категории
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-12 w-full">
          {categoriesData.map((el) => (
            <CategoriesItem key={el.id} img={el.image} title={el.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
