import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs({ categories }) {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNameMap = {
    catalog: "Каталог",
  };

  return (
    <nav className="flex text-sm text-gray-500 mb-6 px-4">
      <Link to="/" className="hover:text-black transition-colors">
        Главная
      </Link>

      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        let name = breadcrumbNameMap[value];
        if (!name) {
          const cat = categories.find((c) => c.slug === value);
          name = cat ? cat.name : value;
        }

        return (
          <span key={to} className="flex items-center">
            <span className="mx-2">/</span>
            {last ? (
              <span className="text-gray-900 font-medium">{name}</span>
            ) : (
              <Link to={to} className="hover:text-black transition-colors">
                {name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
