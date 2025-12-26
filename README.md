# tb-poc-login
### How to use project
1. Run `openssl rand -base64 64` to generate a secure `JWT_SECRET`.
2. Set up `.env` files for both the `api` and `ui` services, following the provided `.env.example` files.
3. Run `docker compose up --build -d` to start the application.

### Demo
![Login](public/images/ui-1.png)
![Register](public/images/ui-2.png)
![Dashboard](public/images/ui-3.png)

### Database
![Schema](public/images/db-1.png)
![Demo Data](public/images/db-demo.png)
