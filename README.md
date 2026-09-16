# ImposterGame

A multiplayer impersonation game built with React/TypeScript frontend and Spring Boot backend, featuring real-time collaboration through WebSocket connections.

## Overview

ImposterGame is a social deduction-style game where players assume different roles—including imposters—to outsmart each other in a dynamic lobby environment. The frontend delivers a responsive, interactive experience using React and Tailwind CSS, while the backend provides persistent game state management and real-time communication via WebSockets. The architecture separates concerns between client-side UI logic and server-side game logic, ensuring scalability and smooth multiplayer experiences.

## Features

- **Multiplayer Lobby System** – Players join rooms, form teams, and compete in real time
- **Role-Based Gameplay** – Supports impostors, players, and moderators with distinct card-based interactions
- **Real-Time Communication** – WebSocket-powered live updates for actions, messages, and game events
- **Dynamic Visual Effects** – Animated backgrounds and immersive visual feedback during gameplay
- **State Management** – Centralized Redux store for consistent state across all components
- **Full-Stack Architecture** – React frontend paired with Spring Boot backend (Java 21)

## Quick Start

### Prerequisites

- Node.js (for frontend development)
- Java 21 + Maven (for backend compilation)
- Docker (optional, for containerized deployment)

### Install Dependencies

First, install the required packages for both frontend and backend:

```bash
# Clone the repository
git clone https://github.com/eyadmohamed919/ImposterGame.git
cd ImposterGame

# Install frontend dependencies (Node.js)
npm install --prefix ./frontend/imposter

# Install backend dependencies (Maven)
mvn dependency:resolve -pl backend -am
```

### Run the Application

Start the development servers in parallel:

```bash
# Terminal 1 – Frontend (hot reload)
cd frontend/imposter
npm run dev

# Terminal 2 – Backend
cd ../backend
mvn spring-boot:run
```

The frontend will be accessible at `http://localhost:5173` and the backend at `http://localhost:8080`.

## Project Structure

```
impostergame/
├── backend/                    # Spring Boot backend (Java 21)
│   ├── src/main/java/...       # Business logic, controllers, services
│   ├── src/main/resources/...   # Configuration (application.properties)
│   └── pom.xml                 # Maven build configuration
├── frontend/imposter/          # React/TypeScript frontend (Vite)
│   ├── src/                    # Source code
│   │   ├── App.tsx             # Root component
│   │   ├── main.tsx            # Entry point
│   │   ├── components/         # Reusable UI components
│   │   │   ├── GameRoom.tsx
│   │   │   ├── Lobby.tsx
│   │   │   ├── RoleCard.tsx
│   │   │   ├── CreateGame.tsx
│   │   │   └── CreatePlayer.tsx
│   │   ├── features/           # Feature slices (Redux)
│   │   │   ├── GamesSlice.tsx
│   │   │   └── PlayerListSlice.tsx
│   │   └── ...
│   ├── package.json            # Frontend dependencies & scripts
│   └── tsconfig.json           # TypeScript configuration
└── README.md                    # This document
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19.2.7, TypeScript, Vite 8.1.0, Tailwind CSS 4.3.1 |
| **State Management** | Redux Toolkit 2.12.0, React-Redux 9.3.0 |
| **Backend** | Spring Boot 4.1.0, Java 21 |
| **Database** | PostgreSQL |
| **Real-Time** | WebSocket (Stomp.js) |
| **Build Tools** | Maven 4.1.0, npm (frontend) |

## Configuration

### Backend Configuration

The Spring Boot application reads configuration from `backend/src/main/resources/application.properties`. Key properties include database connection settings, WebSocket endpoints, and application metadata.

Example property locations (not exhaustive):

- `server.port` – HTTP port for REST endpoints
- `database.url` – PostgreSQL connection string
- `websocket.port` – WebSocket listening port
- `app.name` – Application identifier

### Frontend Configuration

The frontend uses standard Vite configuration with Tailwind CSS. No additional environment variables are required beyond those set by your local development environment.

## Usage

Once both servers are running, navigate to the application in your browser:

- **Lobby** – Join a room, invite friends, and start games
- **Game Room** – Participate in active matches with real-time updates
- **Create Game** – Initiate new game sessions from the main interface
- **Create Player** – Add new participants to ongoing or upcoming games

For detailed interaction patterns, refer to the component documentation in the source tree (`frontend/imposter/src/`).

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Code Standards** – All code must pass linting (`npm run lint`) and type checking (`npm run build`).
2. **Testing** – Backend tests reside in `backend/src/test/`. Ensure test coverage remains adequate before merging.
3. **Documentation** – Update README and component docs when making significant changes.
4. **Branch Strategy** – Create feature branches from `main` and open pull requests targeting the same base.

Before submitting a PR, ensure:
- All tests pass (`npm test` for frontend, `mvn test` for backend)
- Linting passes (`npm run lint`)
- Changes align with the project's architectural decisions

## License

This project is licensed under the MIT License (see `LICENSE` file in the repository for details).

---

*Last updated based on repository evidence.*
