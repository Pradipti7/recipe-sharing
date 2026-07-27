package db

import (
	"context"
	"fmt"
	"os"
	"strings"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

var Pool *pgxpool.Pool

func Connect() error {
	connStr := os.Getenv("DATABASE_URL")
	if connStr == "" {
		connStr = "postgres://postgres:postgres@localhost:5432/recipe_sharing?sslmode=disable"
	}

	dbName := extractDBName(connStr)

	if err := ensureDatabase(dbName, connStr); err != nil {
		return fmt.Errorf("database setup failed: %w", err)
	}

	var err error
	Pool, err = pgxpool.New(context.Background(), connStr)
	if err != nil {
		return fmt.Errorf("unable to create connection pool: %w", err)
	}

	if err = Pool.Ping(context.Background()); err != nil {
		return fmt.Errorf("unable to ping database: %w", err)
	}

	if err := runMigrations(); err != nil {
		return fmt.Errorf("migrations failed: %w", err)
	}

	fmt.Println("Connected to PostgreSQL")
	return nil
}

func extractDBName(connStr string) string {
	parts := strings.Split(connStr, "/")
	last := parts[len(parts)-1]
	name := strings.Split(last, "?")[0]
	if name == "" {
		return "postgres"
	}
	return name
}

func ensureDatabase(dbName, connStr string) error {
	adminConnStr := strings.Replace(connStr, "/"+dbName, "/postgres", 1)
	if strings.HasSuffix(connStr, dbName) {
		adminConnStr = strings.TrimSuffix(connStr, dbName) + "postgres"
	}

	conn, err := pgx.Connect(context.Background(), adminConnStr)
	if err != nil {
		return fmt.Errorf("connect to admin db: %w", err)
	}
	defer conn.Close(context.Background())

	var exists bool
	err = conn.QueryRow(context.Background(),
		"SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname = $1)", dbName).
		Scan(&exists)
	if err != nil {
		return fmt.Errorf("check database: %w", err)
	}

	if !exists {
		_, err = conn.Exec(context.Background(), fmt.Sprintf("CREATE DATABASE %s", pgx.Identifier{dbName}.Sanitize()))
		if err != nil {
			return fmt.Errorf("create database: %w", err)
		}
		fmt.Printf("Created database: %s\n", dbName)
	}

	return nil
}

func runMigrations() error {
	_, err := Pool.Exec(context.Background(), `
		CREATE TABLE IF NOT EXISTS recipes (
			id SERIAL PRIMARY KEY,
			title VARCHAR(255) NOT NULL,
			description TEXT DEFAULT '',
			image VARCHAR(500) DEFAULT '',
			ingredients TEXT DEFAULT '',
			steps TEXT DEFAULT '',
			created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
			updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
		)
	`)
	if err != nil {
		return fmt.Errorf("create recipes table: %w", err)
	}
	fmt.Println("Migrations complete")
	return nil
}

func Close() {
	if Pool != nil {
		Pool.Close()
	}
}
