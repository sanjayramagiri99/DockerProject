# Multi-Page Full-Stack Application (React + Java)

This project contains a React frontend with three pages and a Java microservice backend (Spring Boot). The backend persists data to MySQL (supports both local MySQL and AWS RDS).

## Structure
- `frontend/` — React app using Vite with React Router for multi-page navigation
- `backend/` — Spring Boot microservice with REST APIs for Users, Products, and Tasks

## Features
- **Three Pages:**
  1. **User Registration** - Register users with name, email, and phone
  2. **Product Entry** - Add products with name, price, and description
  3. **Task Management** - Create tasks with title, description, and priority (Low/Medium/High)
- **Database Support:**
  - Local MySQL (via Docker Compose)
  - AWS RDS MySQL (via environment variables)

## Prerequisites
- Node.js 18+ and npm
- Java 17+
- Maven 3.9+
- Docker and Docker Compose (for containerized deployment)
- MySQL 8+ (for local development without Docker)

## Local Development (Without Docker)

### Backend Setup
1. Start MySQL locally and create the database:
   ```sql
   CREATE DATABASE demo_db;
   ```
2. Update `backend/src/main/resources/application.properties` with your MySQL credentials
3. Run the service:
   ```bash
   cd backend
   mvn clean spring-boot:run   # http://localhost:8080
   ```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev   # http://localhost:5173
```

## API Endpoints

### Users
- `GET /api/users` — List all users (newest first)
- `POST /api/users` — Create user with JSON body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }
  ```

### Products
- `GET /api/products` — List all products (newest first)
- `POST /api/products` — Create product with JSON body:
  ```json
  {
    "name": "Product Name",
    "price": 29.99,
    "description": "Product description"
  }
  ```

### Tasks
- `GET /api/tasks` — List all tasks (newest first)
- `POST /api/tasks` — Create task with JSON body:
  ```json
  {
    "title": "Task Title",
    "description": "Task description",
    "priority": "HIGH"
  }
  ```

## Run with Docker Compose

### Using Local MySQL (Default)
```bash
docker compose -f Docker-compose.yaml up --build
```

Services:
- MySQL: `localhost:3306` (user: `demo`, pass: `demo123`, db: `demo_db`, root pass: `changeme`)
- Backend: `http://localhost:8080`
- Frontend: `http://localhost:5173`

### Using AWS RDS

1. **Comment out the `db` service** in `Docker-compose.yaml` (or remove it)

2. **Update backend environment variables** in `Docker-compose.yaml`:
   ```yaml
   backend:
     environment:
       SPRING_DATASOURCE_URL: jdbc:mysql://your-rds-endpoint.region.rds.amazonaws.com:3306/demo_db?useSSL=true&requireSSL=true
       SPRING_DATASOURCE_USERNAME: your-rds-username
       SPRING_DATASOURCE_PASSWORD: your-rds-password
       SPRING_JPA_HIBERNATE_DDL_AUTO: update
   ```

3. **Remove the `depends_on: db`** section from the backend service

4. **Run Docker Compose:**
   ```bash
   docker compose -f Docker-compose.yaml up --build
   ```

### AWS RDS Setup Notes
- Ensure your RDS instance is publicly accessible (or configure VPC/security groups appropriately)
- The database `demo_db` will be created automatically if `createDatabaseIfNotExist=true` is in the URL
- SSL is enabled by default for RDS connections (`useSSL=true&requireSSL=true`)
- Connection pool settings are optimized for RDS in `application.properties`

## Configuration

### Backend Configuration
Edit `backend/src/main/resources/application.properties` to customize:
- Database connection (supports environment variable overrides)
- JPA/Hibernate settings
- Connection pool settings

### Frontend Configuration
- API base URL is set via build arg `VITE_API_BASE` in Docker Compose
- For local development, defaults to empty string (relative URLs)
- For Docker, set to `http://localhost:8080` to access backend from browser

## Database Schema
The application automatically creates the following tables:
- `users` - User registrations
- `products` - Product catalog
- `tasks` - Task management
- `notes` - Legacy notes table (from original implementation)

All tables include `id`, `createdAt` timestamp, and entity-specific fields.
