
function RecipeCard({ recipe }) {
  return (
    <div
      className="card h-100 border-0 shadow-sm"
      style={{
        borderRadius: "18px",
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="card-img-top"
        style={{
          height: "500px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column">

        <h4
          className="fw-bold"
          style={{ color: "#2B211D" }}
        >
          {recipe.title}
        </h4>

        <p
          style={{
            color: "#7A4B32"
          }}
        >
          {recipe.description}
        </p>

        <button
          className="btn mt-auto"
          style={{
            background: "#D64B3E",
            color: "white",
            borderRadius: "10px"
          }}
        >
          View Recipe
        </button>

      </div>
    </div>
  );
}

export default RecipeCard;