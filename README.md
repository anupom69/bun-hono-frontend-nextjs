Frontend for [Bun Hono Backend](https://github.com/frictri/bun-hono-backend).

## Getting Started

### Prerequisites

- Make sure your backend server is running. [Bun Hono Backend](https://github.com/anupom69/bun-hono-backend-optimized)

### Installation

First, run the development server:

```bash
pnpm install
```
Create .env file in the root directory and add the following:

```bash
BACKEND_URL=http://localhost:3000
USERNAME="" # same as backend
PASSWORD="" # same as backend
```

Run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

**Note**: If Backend is running in different port, change the `BACKEND_URL` in `.env` file. And if running in PORT 3000 the frontend will run in PORT 3001.