import { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === item.id && fav.type === item.type)) {
        return prev.filter((fav) => !(fav.id === item.id && fav.type === item.type));
      }
      return [...prev, item];
    });
  };

  const removeFavorite = (id, type) => {
    setFavorites((prev) => prev.filter((fav) => !(fav.id === id && fav.type === type)));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
