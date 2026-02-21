import React, { useEffect } from "react";
import Carusel from "./Carusel";
import Dignity from "./Dignity/Dignity";
import Categories from "./Categories/Categories";
import Catalog from "./Catalog/Catalog";

export default function Main({ addToCart, catalogList, catalogSkelet }) {
  return (
    <main>
      <Carusel />
      <Dignity />
      <Categories />
      <Catalog
        addToCart={addToCart}
        catalogSkelet={catalogSkelet}
        catalogList={catalogList}
      />
    </main>
  );
}
