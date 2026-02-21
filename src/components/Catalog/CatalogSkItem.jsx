import React from "react";

export default function CatalogSkItem() {
  return (
    <div className="flex flex-col bg-white w-full shadow-sm rounded-2xl overflow-hidden border border-black/5">
      <div className="relative w-full aspect-square bg-gray-100 animate-pulse"></div>

      <div className="p-5 flex flex-col items-start bg-white">
        <div className="w-full mb-3 space-y-2">
          <div className="h-4 bg-gray-100 rounded-xl w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-100 rounded-xl w-1/2 animate-pulse"></div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-gray-100 animate-pulse"></div>
          <div className="h-3 bg-gray-100 rounded-xl w-20 animate-pulse"></div>
        </div>

        <div className="h-6 bg-gray-100 rounded-xl w-24 animate-pulse"></div>
      </div>
    </div>
  );
}
