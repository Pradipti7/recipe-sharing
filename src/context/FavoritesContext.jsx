import { createContext } from "react";
import useFavorites from "../hooks/useFavorites";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const favoritesData = useFavorites();
  return (
    <FavoritesContext.Provider value={favoritesData}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
