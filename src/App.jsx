import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import AddRecipe from "./pages/AddRecipe";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/recipes" element={<Recipes />} />

        <Route path="/add" element={<AddRecipe />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
