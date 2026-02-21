import React from "react";
import { Link } from "react-router-dom";

import CatalogItem from "../Catalog/CatalogItem";
import CatalogSkItem from "./CatalogSkItem";

export default function FullCatalog({ catalogList, catalogSkelet, addToCart }) {
  return (
    <div>
      <section className="flex w-full py-12 gap-5 flex-col items-center mt-[80px]">
        <div className="w-full max-w-[1400px] px-4">
          <Link to="/catalog">
            <h1 className="text-2xl md:text-3xl mb-8">Каталог</h1>
          </Link>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {catalogSkelet
              ? Array(8)
                  .fill(0)
                  .map((_, index) => <CatalogSkItem key={index} />)
              : catalogList.map((item) => (
                  <CatalogItem
                    addToCart={addToCart}
                    key={item.id}
                    item={item}
                  />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}
