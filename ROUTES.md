# React-v15-Greenfield-11091 — Routes & Navigation

## How to run
cd /home/ryzen/frontend_generator_backend-test/frontend_runs/run_fa7aa01a_20260911_055329/project
npm install --legacy-peer-deps && npm run dev
Then open http://localhost:41247

## Routes

| Route | Page file | Description |
|-------|-----------|-------------|
| / | redirects | Redirects to the dashboard. |
| /dashboard | src/pages/Dashboard.tsx | Financial metrics, category spending, and recent activity. |
| /transactions | src/pages/Transactions.tsx | Searchable, filterable, sortable transaction table. |
| /transactions/new | src/pages/TransactionForm.tsx | Form for creating a persisted transaction. |
| /transactions/:id/edit | src/pages/TransactionForm.tsx | Form for editing a persisted transaction. |
| /categories | src/pages/Categories.tsx | Built-in and custom expense category management. |
| /monthly-summary | src/pages/MonthlySummary.tsx | Month-specific income, expense, balance, and category breakdown. |
| * | src/pages/NotFound.tsx | Unknown-route error page with a dashboard action. |

## Navigation map
- Sidebar -> Dashboard, Transactions, Categories, and Monthly Summary (navigation links).
- Dashboard -> Add Transaction (Add transaction button).
- Dashboard -> Transactions (View all button) and Edit Transaction (recent transaction row).
- Transactions -> Add Transaction (Add transaction button).
- Transactions -> Edit Transaction (row edit action).
- Transactions -> Delete confirmation dialog (row delete action); confirming updates the table.
- Transaction form -> Transactions (save or cancel); Back returns to the prior screen.
- Categories -> Delete category confirmation dialog (unused custom category action).
- Monthly Summary -> Transactions (View transactions button).
- Any page -> NotFound (unknown URL); NotFound -> Dashboard (Go home button).

## Shared components
- src/components/Sidebar.tsx — Responsive primary navigation.
- src/components/TopBar.tsx — Header with product context and current date.
- src/components/Icon.tsx — React 15-compatible SVG icon primitive.

## Design tokens
- primary: #2563eb
- surface: #ffffff
- canvas: #f8fafc
- ink: #172033
- muted: #64748b
- line: #e2e8f0
- income: #16a34a
- expense: #dc2626
- accent: #7c3aed
- warning: #f59e0b
