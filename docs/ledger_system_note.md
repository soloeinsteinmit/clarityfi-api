## 🧾 What is a “Ledger-Style” System?

Imagine your **bank account** is like a notebook.

Every time money goes in or out, you don’t overwrite the total — you write down the transaction:

| Date   | Description     | Amount  | Balance |
| ------ | --------------- | ------- | ------- |
| July 1 | Deposit         | +100.00 | 100.00  |
| July 3 | Coffee purchase | -5.00   | 95.00   |
| July 5 | Salary          | +500.00 | 595.00  |

That’s a **ledger** — a list of **immutable (unchangeable)** entries. You **never delete or edit** entries. You only **add new ones**. This is how real banks do it.

---

## 💡 Why Not Just Store the Account Balance?

You _could_ say:

> "Hey, I’ll just keep one `account_balance` field and update it each time a transaction happens."

✅ Sounds easier.
❌ But it can **easily go wrong** if:

- A transaction is **delayed**, **reversed**, or **fails**.
- Someone **manually updates** the balance field.
- You need to **audit** or find out _why_ a balance is what it is.

That’s why ledger-style is preferred: the **balance is derived**, not stored.

---

## 🛠️ So How Do We Track Balances?

There are **three options** — you choose based on your system's complexity and performance needs:

---

### 1. **Calculate on the fly (simplest & safest)**

Every time you want to know someone’s balance:

```sql
SELECT SUM(amount)
FROM transactions
WHERE account_id = 'abc' AND status = 'posted';
```

💥 You’re calculating it **live** from actual transactions.

✅ Perfect accuracy.
❌ Can be slow if you have millions of rows.

---

### 2. **Store the balance, but only as a derived value**

You keep the `account_balance` field **updated automatically** by your system — **never manually**.

When a transaction is finalized:

```plaintext
1. Insert transaction → +$500
2. Update account balance → last_balance + 500
```

✅ Faster reads.
❌ You must be **very careful** that updates are always correct, or it goes out of sync (aka “drift”).

---

### 3. **Journal/Batched reconciliation (advanced systems)**

Large fintech apps (banks, PayPal, etc.):

- Write transactions to the ledger.
- Periodically **recalculate all balances** (daily or hourly).
- Compare the live stored balance with the derived one.
- If they **don’t match**, flag for investigation.

This is called **reconciliation**.

---

## 🔐 Why Keep Transactions Immutable?

Imagine a user tries to **edit** a past transaction.
If you just change the `amount`, you change history. That breaks the system!

Instead:

- Mark the old transaction as **reversed**
- Add a **new transaction** that offsets it

This creates a **clear audit trail**, just like banks or accounting systems.

---

## 🔁 Summary: Best Practices Recap

| Principle                                 | Why It Matters                    |
| ----------------------------------------- | --------------------------------- |
| Keep transactions immutable               | Prevent tampering, enable audits  |
| Calculate balance from transactions       | Ensures accuracy and traceability |
| If you store balance, treat it as derived | Never manually edit it            |
| Use reversal transactions, not edits      | Keeps system clean and auditable  |

---

Would you like a visual animation or SQL version of how this works?
Or maybe a beginner-level code snippet in Python or JavaScript?

I’ll walk with you step by step.
