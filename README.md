# Car Rental App Backend

Backend API for a car rental platform built with Node.js, Express, and MongoDB.  
It provides JWT-based authentication, car catalogue management, rental booking, and Swagger-powered API documentation.

## Tech Stack
- Node.js 18+ with Express 4
- MongoDB with Mongoose ODM
- JWT for stateless auth (`middleware/auth.js`)
- Swagger (`swagger-ui-express` + `swagger-jsdoc`)
- Docker + Docker Compose for containerized runs

## Features
- User registration/login with hashed passwords and role support (`user` / `admin`)
- Admin-only endpoints to create cars and update rental payment status
- Public car catalogue with rich filtering options (brand, fuelType, price range)
- Rental workflow that validates overlapping bookings and calculates pricing
- Self-serve API documentation at `/api/docs`

## Project Structure
```
config/          MongoDB connection helper
controllers/     Route handlers (auth, car, rental, booking)
middleware/      Auth guards (JWT protection, admin gate)
models/          Mongoose schemas (User, Car, Rental, Booking)
routes/          Express routers mounted under /api/*
server.js        App entry point + Swagger bootstrap
```

## Getting Started
### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Create a `.env` file (see `.env` in the repo for an example) with:

| Variable             | Required | Default                     | Description                                  |
|----------------------|----------|-----------------------------|----------------------------------------------|
| `PORT`               | No       | `50001`                     | HTTP port for Express                        |
| `MONGO_URI`          | Yes      |                             | MongoDB connection string                    |
| `JWT_SECRET`         | Yes      |                             | Secret used to sign authentication tokens    |
| `JWT_EXPIRES_IN`     | No       | `7d`                        | Token TTL (passed to `jsonwebtoken`)         |
| `STRIPE_SECRET_KEY`  | No       |                             | Reserved for future Stripe integration       |
| `STRIPE_WEBHOOK_SECRET` | No    |                             | Reserved for future Stripe integration       |

Make sure MongoDB is running and accessible via `MONGO_URI`.

### 3. Run the API
- Development (Nodemon + reload):
  ```bash
  npm run dev
  ```
- Production (plain Node):
  ```bash
  npm start
  ```
- Docker Compose:
  ```bash
  docker compose up --build
  ```

The server listens on `http://localhost:50001` by default and exposes Swagger docs at `http://localhost:50001/api/docs`.

## Key Endpoints

| Method | Path                    | Description                          | Auth          | Role   |
|--------|-------------------------|--------------------------------------|---------------|--------|
| POST   | `/api/auth/register`    | Register a user                      | Public        | —      |
| POST   | `/api/auth/login`       | Obtain JWT token                     | Public        | —      |
| GET    | `/api/cars`             | List/filter cars                     | Public        | —      |
| POST   | `/api/cars`             | Create a car                         | Bearer token  | Admin  |
| POST   | `/api/rentals`          | Create a rental                      | Bearer token  | User   |
| GET    | `/api/rentals/my`       | View rentals for the current user    | Bearer token  | User   |
| PUT    | `/api/rentals/:id/pay`  | Mark a rental as paid                | Bearer token  | Admin  |

See `/routes/*.js` and `/controllers/*.js` for more details.

## Swagger & Testing
- Swagger UI: `GET /api/docs`
- The repo currently has no automated tests (`npm test` is a placeholder). Consider adding integration tests with a tool such as Jest or Supertest before deploying broadly.

## Useful Scripts
- `npm run dev` – watches files with Nodemon and restarts on change.
- `npm start` – production-style start.
- `docker compose up --build` – run the API + MongoDB if you extend `docker-compose.yml`.

## Contributing
1. Fork the repo and create a feature branch.
2. Make your changes and ensure lint/tests (when added) pass.
3. Submit a pull request describing the change.

## License
ISC © Contributors

