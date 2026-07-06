import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <section className="text-center py-5" 
      style={{
        backgroundColor: "#46603D",
        color: "#F3F6EE",
        minHeight:"75vh",
        display: "flex",
        alignments:"center"

      }}>
        <div className="container">
          <h1 className="display-2 fw-bold">Discover Amazing Recipes</h1>
          <p className="lead mt-3"> Share your favorite dishes with the world </p>
          <Link to="/recipes" className="btn btn-lg mt-4"
          style={{
            background:"#E8A33D", 
            color: "#2B211D",
            border: "none"
          }}>
            Browse Recipes
          </Link>
        </div>
      </section>
      <section className="container py-5">
        <div className="row text-center">
          <div className="col-md-4">
            <h2> 🍕 </h2>
            <h4> Thousands of Recipes </h4>
            <p> Find recipes from all around the world.</p>
          </div>
          <div className="col-md-4">
            <h2> 👨‍🍳 </h2>
            <h4> Share Recipes </h4>
            <p> Upload your own recipes. </p>
          </div>
          <div className="col-md-4">
            <h2> ❤️ </h2>
            <h4> Save Your Favorites </h4>
            <p> Create your personal cookbook. </p>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;
