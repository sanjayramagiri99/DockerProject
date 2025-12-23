# Full-Stack Starter (React + Java)

This project contains a React frontend and a Java microservice backend (Spring Boot). The backend persists notes to MySQL. Docker artifacts are intentionally omitted per request.

## Structure
- `frontend/` — React app using Vite build tooling.
- `backend/` — Spring Boot microservice exposing a sample API.

## Prerequisites
- Node.js 18+ and npm
- Java 17+
- Maven 3.9+ (wrapper not included)
- MySQL 8+ running locally

## Backend (MySQL + Spring Boot)
1) Start MySQL locally and create (or let Hibernate create) the DB in `application.properties`:
   - Default URL: `jdbc:mysql://localhost:3306/demo_db?createDatabaseIfNotExist=true`
   - Default credentials: `root / changeme` (change these in `backend/src/main/resources/application.properties`)
2) Run the service:
```bash
cd backend
mvn clean spring-boot:run   # http://localhost:8080
```

API routes:
- `GET /api/notes` — list notes (newest first)
- `POST /api/notes` — create note with JSON body `{ "text": "your note" }`

## Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev   # http://localhost:5173
npm run build # production build into dist/
```

The UI lets you add notes and view them; it calls the backend on `http://localhost:8080`.

## Notes
- No Dockerfile is provided; feel free to add containerization as needed.
- Ports, DB URL, and credentials can be adjusted in `backend/src/main/resources/application.properties`.


