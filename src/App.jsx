import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetail from "./pages/RecipeDetail";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes" element={<Recipes />} />

          <Route path="/add" element={<AddRecipe />} />
        </Routes>

        <Footer />
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
