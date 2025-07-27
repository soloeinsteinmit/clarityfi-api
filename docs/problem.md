### The Big Picture: What Problem is ClarityFi Solving?

**Problem:** Most people don't know where their money _really_ goes. They have money in different places (bank account, credit card, cash app) and their spending is a blur. They feel financially disorganized and lack the clarity to make smart decisions.

**Solution:** ClarityFi is a simple, beautiful dashboard that brings all your financial information into one place. It gives you **clarity** on your financial health by showing you exactly where your money comes from and where it goes, so you can finally feel in control.

---

### The Core "Things" (Entities) in Your System

Here is the simple breakdown of what represents what:

1.  **What represents a person using your app?**

    - A **`User`**. This is the main entity. It has an `email`, a hashed `password`, and a `name`. Every other piece of data in the system will belong to a `User`.

2.  **What represents their money containers?**

    - An **`Account`**. This represents a place where a user's money lives. Examples could be "Chase Checking," "Savings Account," or "Coinbase Wallet." Each `Account` will have a `name`, a `type` (e.g., 'Bank', 'Credit Card', 'Cash'), and will belong to a `User`.

3.  **What represents money movements?**
    - A **`Transaction`**. This is the most critical entity. It represents a single movement of money—either coming in or going out. Every `Transaction` will have an `amount`, a `type` ('Income' or 'Expense'), a `category` ('Groceries', 'Salary', 'Rent'), a `date`, and will belong to a specific `Account`.

That's it.

**The whole system is just this:** A **`User`** has many **`Accounts`**, and each **`Account`** has many **`Transactions`**.

Everything I build—the API, the dashboard, the AI—is just a way to create, read, update, and analyze these three simple things. I now have the full picture. I understand the problem and you understand the core building blocks.

Proceed.
