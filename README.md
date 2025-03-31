
# UPI Expense Guardian

A comprehensive expense tracking application with UPI integration for Indian users.

## Project Structure

This project is organized into two main parts:

- **Frontend**: React application built with Vite, TypeScript, and Tailwind CSS
- **Backend**: Express API providing endpoints for all application features

## Running the Application

### Development Mode (Frontend and Backend together)

This will run both frontend and backend using the Vite development server with a proxy to the API:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at [http://localhost:8080](http://localhost:8080)

### Running Backend Only

If you want to run the backend separately:

```bash
# From the project root
cd src/backend

# Compile TypeScript to JavaScript (if needed)
npx tsc

# Start the server
node server.js
```

The API will be available at [http://localhost:5000/api](http://localhost:5000/api)

## Backend API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `PUT /api/auth/onboarding/:userId` - Complete user onboarding

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get transaction by ID
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Wallets
- `GET /api/wallets` - Get all wallets
- `GET /api/wallets/:id` - Get wallet by ID
- `POST /api/wallets` - Create new wallet
- `PUT /api/wallets/:id` - Update wallet
- `DELETE /api/wallets/:id` - Delete wallet

### Budgets
- `GET /api/budgets` - Get all budgets
- `GET /api/budgets/:id` - Get budget by ID
- `POST /api/budgets` - Create new budget
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget

### Analytics
- `GET /api/analytics/expenses-by-category` - Get expenses grouped by category
- `GET /api/analytics/monthly-transactions` - Get monthly transactions summary
- `GET /api/analytics/recent-transactions` - Get recent transactions
- `GET /api/analytics/summary` - Get overall transactions summary

## Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

```
PORT=5000
NODE_ENV=development
```

## Technologies Used

### Frontend
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Query
- React Router
- Axios

### Backend
- Express
- TypeScript
- CORS

## Authentication

This project uses JWT for authentication. When a user logs in, a token is returned and stored in local storage. This token is then included in the Authorization header for all subsequent API requests.
