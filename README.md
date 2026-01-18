# Expense Tracker

A minimal full-stack personal finance tool that allows users to record and review expenses.

## Features
- Create an expense (amount, category, description, date)
- View expenses
- Filter by category
- Sort by date (newest first)
- View total of visible expenses

## Tech Stack
- Backend: Node.js, Express, SQLite
- Frontend: React (Vite)
- Database: SQLite (file-based)

## Design Decisions
- Money is stored as integers (cents/paise) to avoid floating-point errors.
- The backend uses idempotency keys to safely handle retries, refreshes, and duplicate submissions.
- SQLite was chosen for simplicity, persistence, and low operational overhead.

## Real-World Reliability
- Duplicate submissions are prevented using Idempotency-Key.
- Backend is safe against network retries and page refreshes.
- Basic validation prevents invalid data.

## Trade-offs
- No authentication (single-user scope).
- No pagination (small dataset assumption).
- Minimal UI styling to focus on correctness.

## AI Usage
AI tools were used for architecture validation and edge-case analysis. All code was implemented and reviewed manually.

## Running Locally

### Backend
