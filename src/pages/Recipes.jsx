import RecipeCard from "../components/RecipeCard";
import pizza from "../images/pizza.jpeg";
import burger from "../images/burger.jpeg";
import pasta from "../images/pasta.webp";
import momo from "../images/momo.webp";

function Recipes() {
  const recipes = [
    {
      title: "Pizza",
      description: "Italian Pizza",
      image: pizza,
    },
    {
      title: "Burger",
      description: "Homemade Chicken Burger",
      image: burger,
    },
    {
      title: "Pasta",
      description: "Creamy Alfredo Pasta",
      image: pasta,
    },
    {
      title: "Momo",
      description: "Juicy Chicken Momo",
      image: momo,
    },
  ];
  return (
    <div className="container py-5">
      <h2 className="mb-4">Popular Recipes</h2>
      <div className="mb-4">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
            
        ))}
      </div>
    </div>
  );
}
export default Recipes;
