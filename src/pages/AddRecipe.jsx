import { useState } from "react";

function AddRecipe() {
  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    description: "",
    ingredients: "",
    steps: "",
  });

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(recipe);
    alert("Recipe Submitted!");
  };

  return (
    <div className="container py-5">

      <div
        className="card border-0 shadow mx-auto"
        style={{
          maxWidth: "700px",
          borderRadius: "20px",
        }}
      >

        <div className="card-body p-4">

          <h2 className="text-center mb-4">
            Add New Recipe
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="title"
              placeholder="Recipe Title"
              className="form-control mb-3"
              value={recipe.title}
              onChange={handleChange}
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              className="form-control mb-3"
              value={recipe.image}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              rows="3"
              className="form-control mb-3"
              value={recipe.description}
              onChange={handleChange}
            />

            <textarea
              name="ingredients"
              placeholder="Ingredients"
              rows="4"
              className="form-control mb-3"
              value={recipe.ingredients}
              onChange={handleChange}
            />

            <textarea
              name="steps"
              placeholder="Cooking Steps"
              rows="5"
              className="form-control mb-4"
              value={recipe.steps}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="btn w-100"
              style={{
                background: "#46603D",
                color: "white",
              }}
            >
              Submit Recipe
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddRecipe;