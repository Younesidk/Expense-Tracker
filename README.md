# Expense Tracker

A full-stack expense tracker project with:
- **Backend:** ASP.NET Core Web API + Entity Framework Core + SQL Server
- **Frontend:** Vanilla HTML/CSS/JavaScript

## Project Structure

```text
Expense Tracker/
├─ ExpenseTrackerBackend/
│  └─ ExpenseTrackerBackend/
│     ├─ Controllers/
│     ├─ Migrations/
│     ├─ Program.cs
│     ├─ AppDbContext.cs
│     ├─ Transaction.cs
│     └─ appsettings.json
├─ ExpenseTrackerFrontend/
│  ├─ index.html
│  ├─ style.css
│  └─ script.js
└─ README.md
```

## Features

- Add income/expense transactions
- View all transactions in a table
- Delete transactions
- Live totals for:
  - Total Balance
  - Total Income
  - Total Expense

## Tech Stack

- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server (SQL Express supported)
- HTML, CSS, JavaScript (no framework)

## Backend Setup (API)

### 1) Prerequisites

- .NET 8 SDK
- SQL Server instance (e.g. `SQLEXPRESS`)

### 2) Configure connection string

Edit backend config file:
- `ExpenseTrackerBackend/ExpenseTrackerBackend/appsettings.json`

Set `ConnectionStrings:DefaultConnection` to your SQL Server instance.

### 3) Run the API

From:
- `ExpenseTrackerBackend/ExpenseTrackerBackend`

Run:

```bash
dotnet restore
dotnet run
```

Default dev URLs (from launch settings):
- `https://localhost:7284`
- `http://localhost:5025`

Swagger UI:
- `https://localhost:7284/swagger`

## Frontend Setup

The frontend is static and can be opened directly in a browser:

- `ExpenseTrackerFrontend/index.html`

> Note: `script.js` currently calls the backend at `https://localhost:7284/Transaction`. Make sure the API is running at that URL.

## API Endpoints

Base route: `/Transaction`

- `GET /Transaction` — get all transactions
- `POST /Transaction` — create transaction
- `PUT /Transaction/{id}` — update transaction
- `DELETE /Transaction/{id}` — delete transaction

### Transaction model

```json
{
  "id": 1,
  "title": "Groceries",
  "amount": 50.0,
  "type": "Expense",
  "date": "2026-02-14"
}
```

## Notes

- CORS is configured to allow any origin in development.
- This repo includes both frontend and backend in a single repository.
- `appsettings.json` is currently ignored via `.gitignore`; use local config for sensitive values.
