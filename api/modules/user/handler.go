package user

import (
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"

	"tbservice/modules/user/model"
	"tbservice/modules/user/service"
)

type Handler struct {
	service service.UserService
}

func NewHandler(service service.UserService) *Handler {
	return &Handler{service: service}
}

func (h *Handler) Register(c echo.Context) error {
	req := new(model.RegisterRequest)
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request body",
		})
	}

	response, err := h.service.Register(req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, response)
}

func (h *Handler) Login(c echo.Context) error {
	req := new(model.LoginRequest)
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request body",
		})
	}

	response, err := h.service.Login(req)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, response)
}

func (h *Handler) GetProfile(c echo.Context) error {
	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(*model.JWTClaims)

	user, err := h.service.GetProfile(claims.UserID)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, user)
}

func (h *Handler) ProtectedEndpoint(c echo.Context) error {
	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(*model.JWTClaims)

	return c.JSON(http.StatusOK, map[string]interface{}{
		"message":  "This is a protected endpoint",
		"user_id":  claims.UserID,
		"username": claims.Username,
	})
}
