import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderSecond from "./components/HeaderSecond";
import Main from "./components/Main";
import FullCatalog from "./components/FullCatalog/FullCatalog";
import CategoryItems from "./components/FullCatalog/CategoryItems";
import Panel from "./components/rightPanel/Panel";
import ThemeContext from "./context";
import Checkout from "./components/Checkout";
import Header from "./components/Header";

function App() {
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [catalogList, setCatalogList] = useState([]);
  const [catalogSkelet, setCatalogSkelet] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCart, setIsCart] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);

  const toggleFavorite = (item) => {
    const isExist = favorites.find((fav) => fav.id === item.id);
    if (isExist) {
      setFavorites(favorites.filter((fav) => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const deleteAllFavorites = () => setFavorites([]);
  const addToCart = (item) => {
    setCart((prev) => {
      const isExist = prev.find((cartItem) => cartItem.id === item.id);

      if (isExist) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem,
        );
      }

      return [...prev, { ...item, count: 1 }];
    });
  };
  const deleteAllCart = () => setCart([]);

  const categories = [
    { id: 1, name: "Все", slug: "all" },
    { id: 2, name: "Классические", slug: "classic-rolls" },
    { id: 3, name: "Теплые", slug: "hot-rolls" },
    { id: 4, name: "Запеченные", slug: "baked-rolls" },
    { id: 5, name: "Острые", slug: "spicy-rolls" },
    { id: 6, name: "Premium", slug: "premium" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyHeader(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/CatalogSushi.json")
      .then((res) => res.json())
      .then((data) => {
        setCatalogList(data);
        setCatalogSkelet(false);
      });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        favorites,
        toggleFavorite,
        deleteAllFavorites,
        addToCart,
        cart,
        deleteAllCart,
      }}
    >
      <BrowserRouter>
        <Header visible={showStickyHeader} />
        <HeaderSecond catalogList={catalogList} />

        <Panel
          deleteAllCart={deleteAllCart}
          cart={cart}
          setCart={setCart}
          isCart={isCart}
          isFavorites={isFavorites}
          setIsCart={setIsCart}
          setIsFavorites={setIsFavorites}
          favorites={favorites}
          setFavorites={setFavorites}
          deleteAllFavorites={deleteAllFavorites}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                cart={cart}
                setCart={setCart}
                addToCart={addToCart}
                catalogSkelet={catalogSkelet}
                catalogList={catalogList}
              />
            }
          />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
          <Route
            path="/catalog"
            element={
              <FullCatalog
                categories={categories}
                catalogSkelet={catalogSkelet}
                catalogList={catalogList}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/catalog/:slug"
            element={
              <CategoryItems
                catalogSkelet={catalogSkelet}
                catalogList={catalogList}
                categories={categories}
                addToCart={addToCart}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
