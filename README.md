# FreeFlow

FreeFlow is a modern personal finance and cashflow planning app designed around **how people actually get paid**.

Instead of traditional monthly budgeting, FreeFlow works from your **real pay cycle** — weekly, fortnightly or monthly — to show exactly:

* How much income hits your account
* What bills should be allocated this pay
* What is truly disposable
* When expensive periods are coming

Built for Australians first, with support for **PAYG withholding, Medicare Levy and HECS/HELP estimates**.

---

## Features

### Income Planning

Track income and estimate **real take-home pay** using Australian payroll-style withholding.

Includes:

* PAYG tax withholding
* Medicare Levy
* HECS/HELP repayment assumptions
* Weekly, fortnightly and monthly income support
* Take-home pay preview

---

### Smart Expense Planning

FreeFlow smooths expenses across your actual pay cycle.

Examples:

**Fortnightly pay**

Monthly bill:

```txt
Netflix $30/month
```

2-pay month:

```txt
$15 per pay
```

3-pay month:

```txt
$10 per pay
```

Yearly bills are automatically smoothed across the year:

```txt
Car Registration $780/year
≈ $30 per fortnight
```

No more surprise bills.

---

### Expense Planner Calendar

Visualise recurring expenses in a modern calendar view.

Features:

* Recurring expenses
* Weekly / fortnightly / monthly / yearly support
* Bill editing
* Bill scheduling
* Account-linked expenses

---

### Dashboard

A pay-cycle-first dashboard showing:

* **Income This Pay**
* **Bills This Pay**
* **Disposable Income**
* **Budget Health**
* **Need / Want / Save split**

Designed to answer:

> “How much money do I actually have this pay?”

---

### Account Management

Track balances across:

* Transaction accounts
* Bills accounts
* Savings accounts

---

### Local Persistence

FreeFlow stores data locally in your browser.

Your:

* Accounts
* Expenses
* Income
* Settings

persist automatically.

---

## Tech Stack

Built using:

* React
* Vite
* React Router
* FullCalendar
* Recharts
* Local Storage

---

## Installation

Clone the repository:

```bash
git clone <your-repo-url>
cd freeflow
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

---

## Current Status

FreeFlow is currently in **MVP / Beta**.

Core systems complete:

* Income engine
* Pay-cycle budgeting
* Expense planner
* Australian tax estimates
* Dashboard
* Forecast foundations
* Settings

Upcoming:

* Reports
* Cashflow forecasting
* Savings goals
* Export / backup
* Notifications
* Mobile optimisation

---

## Philosophy

Most budgeting apps think in:

> Monthly averages

FreeFlow thinks in:

> Real paydays.

Because budgeting should answer:

> “Can I afford this pay cycle?”

—not just:

> “How much do I spend each month?”

---

## License

Private project – all rights reserved.
