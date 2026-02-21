import React from "react";
import { useParams } from "react-router-dom";
import CatalogItem from "../Catalog/CatalogItem";
import CatalogSkItem from "../Catalog/CatalogSkItem";
import Breadcrumbs from "../breadCrumbs";

export default function CategoryItems({
  catalogList,
  categories,
  catalogSkelet,
  addToCart,
}) {
  const { slug } = useParams();
  const filteredArr = catalogList.filter((el) =>
    slug === "all" ? true : el.category === slug,
  );
  const findObjectCategory = categories.find((el) => el.slug === slug);
  const name = findObjectCategory.name;

  return (
    <section className="flex w-full py-8 md:py-12 flex-col items-center mt-16 md:mt-[80px]">
      <div className="w-full max-w-[1400px] px-4">
        <Breadcrumbs categories={categories} />
        <h1 className="text-2xl md:text-4xl font-semibold mb-8 md:mb-12">
          {name}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {catalogSkelet
            ? Array(8)
                .fill(0)
                .map((_, i) => <CatalogSkItem key={i} />)
            : filteredArr.map((item) => (
                <CatalogItem addToCart={addToCart} key={item.id} item={item} />
              ))}
        </div>
      </div>
    </section>
  );
}
