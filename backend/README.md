# StockBox Backend API

Backend REST API for StockBox inventory management system.

## Features

- Product CRUD operations
- Stock movement tracking
- Low stock alerts
- Multi-tenancy support
- RESTful API design

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MS SQL Server
- **Validation**: Zod

## Project Structure

```
src/
├── api/                    # API controllers
│   └── v1/                 # API version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
├── middleware/             # Express middleware
├── services/               # Business logic
├── instances/              # Service instances
├── utils/                  # Utility functions
├── constants/              # Application constants
└── server.ts               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- MS SQL Server
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```
4. Update database credentials in `.env`

### Development

Run development server:
```bash
npm run dev
```

Server will start at `http://localhost:3000`

### Build

Build for production:
```bash
npm run build
```

### Production

Start production server:
```bash
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### API Version 1
- Base URL: `/api/v1`
- External routes: `/api/v1/external/*`
- Internal routes: `/api/v1/internal/*`

## Environment Variables

See `.env.example` for all available configuration options.

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Code Quality

Run linter:
```bash
npm run lint
```

## License

ISC
