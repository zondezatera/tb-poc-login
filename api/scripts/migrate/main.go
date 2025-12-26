package main

import (
	"fmt"
	"log"
	"os"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func main() {
	// Database URL
	dbURL := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Bangkok",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)

	m, err := migrate.New(
		"file://migrations",
		dbURL,
	)
	if err != nil {
		log.Fatal("Failed to create migrate instance:", err)
	}
	defer m.Close()

	command := "up"
	if len(os.Args) > 1 {
		command = os.Args[1]
	}

	// Execute command
	switch command {
	case "up":
		if err := m.Up(); err != nil && err != migrate.ErrNoChange {
			log.Fatal("Migration up failed:", err)
		}
		log.Println("✓ Migration up completed successfully!")

	case "down":
		if err := m.Down(); err != nil && err != migrate.ErrNoChange {
			log.Fatal("Migration down failed:", err)
		}
		log.Println("✓ Migration down completed successfully!")

	case "drop":
		if err := m.Drop(); err != nil {
			log.Fatal("Drop failed:", err)
		}
		log.Println("✓ All tables dropped successfully!")

	case "force":
		if len(os.Args) < 3 {
			log.Fatal("Please provide version: go run scripts/migrate.go force 1")
		}
		version := os.Args[2]
		var v int
		fmt.Sscanf(version, "%d", &v)
		if err := m.Force(v); err != nil {
			log.Fatal("Force version failed:", err)
		}
		log.Printf("✓ Forced to version %d successfully!", v)

	case "version":
		version, dirty, err := m.Version()
		if err != nil {
			log.Fatal("Get version failed:", err)
		}
		log.Printf("Current version: %d, Dirty: %v", version, dirty)

	case "steps":
		if len(os.Args) < 3 {
			log.Fatal("Please provide steps: go run scripts/migrate.go steps 2")
		}
		var steps int
		fmt.Sscanf(os.Args[2], "%d", &steps)
		if err := m.Steps(steps); err != nil && err != migrate.ErrNoChange {
			log.Fatal("Migration steps failed:", err)
		}
		log.Printf("✓ Migrated %d steps successfully!", steps)

	default:
		log.Fatal("Unknown command. Available: up, down, drop, force, version, steps")
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
