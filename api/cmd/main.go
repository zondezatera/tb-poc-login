package main

import (
	"log"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"tbservice/configs"
	"tbservice/modules/user"
	"tbservice/modules/user/model"
	"tbservice/modules/user/repository"
	"tbservice/modules/user/service"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("⚠️  No .env file found")
	}

	// Load environment variables
	if os.Getenv("JWT_SECRET") == "" {
		log.Fatal("JWT_SECRET environment variable is required")
	}

	// Initialize database
	db := configs.InitDB()

	// Auto migrate
	if err := db.AutoMigrate(&model.User{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// Initialize repositories
	userRepo := repository.NewUserRepository(db)

	// Initialize services
	userService := service.NewUserService(userRepo, os.Getenv("JWT_SECRET"))

	// Initialize handlers
	userHandler := user.NewHandler(userService)

	// Initialize Echo
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())
	// health checker
	e.GET("/health", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{
			"status": "OK",
		})
	})

	// Public routes
	api := e.Group("/api")
	api.POST("/register", userHandler.Register)
	api.POST("/login", userHandler.Login)

	// Protected routes
	protected := api.Group("")
	protected.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey: []byte(os.Getenv("JWT_SECRET")),
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return new(model.JWTClaims)
		},
	}))
	protected.GET("/profile", userHandler.GetProfile)
	protected.GET("/protected", userHandler.ProtectedEndpoint)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server starting on port %s...", port)
	e.Logger.Fatal(e.Start(":" + port))
}
