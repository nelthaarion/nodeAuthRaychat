# Authentication and User Management System

## Overview
This project is a modular authentication and user management system built with **Node.js**, **Express**, and **TypeScript**. It includes features for secure user registration, authentication, and management, with a focus on security and scalability.

---

## Features

### Authentication
- **User Registration:** Securely register new users with email and password.
- **Login:** Authenticate users with email and password.
- **Token Management:** Generate and validate JWT tokens for secure authentication.
- **Session Management:** Store user sessions in Redis for efficient and scalable session handling.

### User Management
- **View Profile:** Retrieve user details (excluding passwords).
- **Update Profile:** Modify user information such as name or role.
- **Delete Account:** Securely delete user accounts.
- **User List:** Retrieve a paginated list of users without sensitive information (e.g., hashed passwords).

### Security
- **Helmet:** Protect HTTP headers for enhanced security.
- **Bcrypt.js:** Encrypt passwords before storing them in the database.
- **Middleware:** Secure routes using validation and authentication middleware.

### Validation
- Use **Joi** for input validation, ensuring data integrity and consistency.

### Modular Structure
- Each module (e.g., auth, user) contains independent controllers, services, models, routes, and validation logic.

### Database
- **MongoDB Driver:** Direct database interactions for CRUD operations.
- **Redis:** Efficient session storage.

---

## Installation

### Prerequisites
- **Node.js** (v14+)
- **MongoDB** (running instance)
- **Redis** (running instance)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/auth-system.git
   cd auth-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret
   MONGO_URI=mongodb://localhost:27017/auth_system
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   ```

4. Start the application:
   ```bash
   npm run dev
   ```

5. The server will run at `http://localhost:3000`.

---

## Project Structure
```plaintext
src/
├── cmd/
├── modules/
│   ├── auth/
│   │   ├── auth.usecase.ts
│   │   ├── auth.service.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.model.ts
│   │   └── auth.validation.ts
│   ├── user/
│       ├── user.usecase.ts
│       ├── user.service.ts
│       ├── user.routes.ts
│       ├── user.model.ts
│       └── user.validation.ts
├── middlewares/
│   ├── validate.ts
│   └── authenticate.ts
├── config/
│   ├── db.ts
│   └── redis.ts
├── index.ts
```

---

## Scripts
- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the project for production.
- **`npm start`**: Start the production server.

---

## API Endpoints

### Auth Module
| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| POST   | `/auth/register` | Register a new user |
| POST   | `/auth/login`    | Login a user        |
| GET    | `/auth/logout`   | Logout client       |

### User Module
| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| GET    | `/users/profile` | Get user profile    |
| PUT    | `/users/profile` | Update user profile |
| DELETE | `/users/profile` | Delete user profile |

---

## Technologies Used
- **Node.js**
- **TypeScript**
- **Express**
- **MongoDB Driver**
- **Redis**
- **Bcrypt.js**
- **JWT (jsonwebtoken)**
- **Joi**
- **Helmet**

---
### Session Management
- **Redis-backed Sessions:** All user sessions are stored in Redis for fast and scalable session management. Each session is identified by a unique session ID stored in a secure HTTP-only cookie.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

