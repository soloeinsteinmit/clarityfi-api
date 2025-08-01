# ClarityFi - API Design

- Base URL: `/api`

---

## USERS

- `POST   /api/users` → Create a user
- `GET    /api/users` → Get all users
- `GET    /api/users/:id` → Get user by ID
- `PATCH    /api/users/:id` → Update user info
- `DELETE /api/users/:id` → Delete user
- `GET    /api/users/:id/download` → Download account data to excel/csv

---

## ACCOUNTS

- `POST   /api/users/:userId/accounts` → Create account for user
- `GET    /api/users/:userId/accounts` → Get all accounts for a user
- `GET    /api/accounts/:accountId` → Get specific account
- `PATCH    /api/accounts/:accountId` → Update account
- `DELETE /api/accounts/:accountId` → Delete account
- `GET    /api/users/:userId/accounts?isActive=true` → Filter by active
- `GET    /api/users/:userId/accounts?isDeleted=true` → Filter by deleted

---

## TRANSACTIONS

- `POST   /api/accounts/:accountId/transactions` → Create transaction on an account
- `GET    /api/accounts/:accountId/transactions` → Get all transactions on account
- `GET    /api/users/:userId/transactions` → Get all user transactions
- `GET    /api/transactions/:transactionId` → Get transaction by ID
- `PATCH    /api/transactions/:transactionId` → Update transaction
- `DELETE /api/transactions/:transactionId` → Delete transaction
- `GET    /api/users/:userId/transactions?status=pending` → Filter by status
- `GET    /api/users/:userId/transactions?direction=income` → Filter by direction
- `GET    /api/users/:userId/transactions?createdAt=2024-12-01` → Filter by date
- `GET    /api/users/:userId/transactions?isDeleted=true` → Filter by deletion
- `GET    /api/users/:userId/transactions?categoryType=utilities` → Filter by category (JOIN with categories)

---

## CATEGORIES

- `POST   /api/users/:userId/categories` → Create a category
- `GET    /api/users/:userId/categories` → Get all user categories
- `GET    /api/users/:userId/categories?isDefault=true` → Filter by default/custom
- `PATCH    /api/categories/:categoryId` → Update category
- `DELETE /api/categories/:categoryId` → Delete category

---

## DELETED USERS

- `POST   /api/deleted-users/:userId` → Mark user as deleted
- `GET    /api/deleted-users` → Get all deleted users
- `GET    /api/deleted-users/:userId` → Get specific deleted user
- `DELETE /api/deleted-users/:userId` → Permanently remove deleted user
- `POST   /api/deleted-users/:userId/restore` → Restore deleted user and data (✨ recovery feature)

## 📄 Feature Documentation: User Data Download & Account Restore

### 🔽 `GET /api/users/:id/download` — Download User Data

**Purpose:** Allow users to download all their data (accounts, transactions, categories) as a `.csv` or `.xlsx`.

**How it works:**

- Fetch the user by ID
- Retrieve all:

  - Accounts linked to the user
  - Transactions per account
  - Categories created by the user

- Convert to CSV or Excel format (use a library like `json2csv` or `exceljs`)
- Send as downloadable file in response

**Example use cases:**

- Compliance with data portability laws (e.g. GDPR)
- User wants a personal financial snapshot
- Exporting for offline analysis

---

### 🧬 `POST /api/deleted-users/:userId/restore` — Restore Deleted Account

**Purpose:** Give users a one-click recovery to fully restore their deleted account and data.

**How it works:**

- Find `DeletedUser` entry using `userId`
- Restore the following:

  - Recreate the user record
  - Reinsert saved accounts, transactions, and categories (from backup/snapshot at deletion time)

- Remove `DeletedUser` record
- Return new access token or redirect user to login

**Restore logic design options:**

1. **Soft delete model** – Mark users/data as `isDeleted = true`, then unmark on restore.
2. **Hard delete with snapshot** – When deleting, save a JSON "snapshot" of all user data. On restore, reinsert everything.

> ✅ I prefer **Option 2 (Snapshot)**. This gives full rollback and keeps the main tables clean.
