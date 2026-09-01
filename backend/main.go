package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"recipe-sharing/db"
	"recipe-sharing/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	if err := db.Connect(); err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(corsMiddleware)

	r.Route("/api", func(r chi.Router) {
		r.Get("/recipes", handlers.GetRecipes)
		r.Post("/recipes", handlers.CreateRecipe)
		r.Get("/recipes/{id}", handlers.GetRecipe)
		r.Put("/recipes/{id}", handlers.UpdateRecipe)
		r.Delete("/recipes/{id}", handlers.DeleteRecipe)
		r.Get("/recipes/{id}/rating", handlers.GetRecipeRating)
		r.Post("/recipes/{id}/rating", handlers.CreateRating)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server running on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
