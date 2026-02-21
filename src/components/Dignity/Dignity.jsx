import React from "react";
import DignityItem from "./DignityItem";
import { Package2, Settings, ExternalLink } from "lucide-react";

export default function Dignity() {
  const featuresData = [
    {
      id: 1,
      title: "Сервис",
      text: "Мы обеспечиваем качественный клиентский сервис для вашего удобства",
      iconName: Package2,
    },
    {
      id: 2,
      title: "Качество",
      text: "Тщательно отбираем ингредиенты и контролируем каждый этап приготовления, чтобы обеспечить свежесть и отличный вкус блюд",
      iconName: Settings,
    },
    {
      id: 3,
      title: "Приятные цены",
      text: "У нас доступные цены на все блюда, чтобы каждый мог насладиться вкусной едой",
      iconName: ExternalLink,
    },
  ];
  return (
    <div className="flex py-10 md:py-15 justify-center px-4">
      <div className="flex flex-col sm:flex-row justify-between max-w-[1000px] gap-8 sm:gap-10 w-full">
        {featuresData.map((el) => (
          <DignityItem
            key={el.id}
            title={el.title}
            text={el.text}
            icon={el.iconName}
          />
        ))}
      </div>
    </div>
  );
}
