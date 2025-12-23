# Full-Stack Starter (React + Java)

This project contains a minimal React frontend and a Java microservice backend (Spring Boot style). Docker artifacts are intentionally omitted per request.

## Structure
- `frontend/` — React app using Vite build tooling.
- `backend/` — Spring Boot microservice exposing a sample API.

## Prerequisites
- Node.js 18+ and npm
- Java 17+
- Maven 3.9+ (wrapper not included)

## Frontend
```bash
cd frontend
npm install
npm run dev   # starts Vite dev server (default: http://localhost:5173)
npm run build # production build into dist/
```

## Backend
```bash
cd backend
mvn clean spring-boot:run   # starts on http://localhost:8080
```

### Sample endpoint
- `GET /api/greeting` → `{"message":"Hello from the microservice"}`

## Notes
- No Dockerfile is provided; feel free to add containerization as needed.
- Ports and other settings can be adjusted in `backend/src/main/resources/application.properties`.


