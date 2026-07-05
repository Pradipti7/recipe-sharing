function RecipeCard({recipe}){
    return(
        <div className="col-md-4 md-4">
            <div className="card shadow h-100">
                <img src={recipe.image} className="card-img-top" style={{height:"220px", objectFit:"cover"}} />
                <div className="card-body">
                    <h4>{recipe.title}</h4>
                    <p>{recipe.description}</p>
                    <button className="btn btn-sucess">
                        View Recipe
                    </button>
                </div>
            </div>
        </div>
    );
}
export default RecipeCard;