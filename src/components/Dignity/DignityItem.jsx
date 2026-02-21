import React from "react";

export default function DignityItem({ title, text, icon: Icon }) {
  return (
    <div className="flex flex-row sm:flex-col items-center sm:items-center gap-4 sm:gap-0 max-w-full sm:max-w-50">
      <Icon className="h-8 w-auto text-black flex-shrink-0" />
      <div className="flex flex-col items-start sm:items-center justify-center sm:mt-10 gap-2">
        <h3 className="text-center font-medium">{title}</h3>
        <p className="text-left sm:text-center text-[12px] text-black/50">
          {text}
        </p>
      </div>
    </div>
  );
}
