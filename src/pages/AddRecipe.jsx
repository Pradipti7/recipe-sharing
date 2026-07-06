function AddRecipe() {
  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    description: "",
    ingridents: "",
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
    alert("Recipe Submitted! ");
  };
  return;
  <div
    clasName="card border-0 shadow"
    style={{
      borderRadius: "20px",
      background: "#fff",
    }}
  ></div>;
}
export default AddRecipe;
