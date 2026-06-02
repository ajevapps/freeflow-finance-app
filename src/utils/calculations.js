// ===================================================
// FREEFLOW FINANCE CALCULATION ENGINE
// ===================================================

const DAY_IN_MS = 1000 * 60 * 60 * 24;

// ===================================================
// DATE HELPERS
// ===================================================

export function daysUntil(date) {
  if (!date) return 0;

  const today = new Date();
  const target = new Date(date);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  return Math.ceil(
    (target - today) / DAY_IN_MS
  );
}

export function sortByDate(items = [], key) {
  return [...items].sort(
    (a, b) =>
      new Date(a[key]) -
      new Date(b[key])
  );
}

export function getNextPay(incomes = []) {
  if (!incomes.length) return null;

  const sorted = sortByDate(
    incomes,
    'nextPayDate'
  );

  return sorted[0];
}

// ===================================================
// INCOME
// ===================================================

export function calculateMonthlyIncome(
  incomes = []
) {
  return incomes.reduce(
    (sum, income) => {
      const amount = Number(
        income.amount || 0
      );

      switch (
        income.frequency
      ) {
        case 'weekly':
          return (
            sum +
            (amount * 52) / 12
          );

        case 'fortnightly':
          return (
            sum +
            (amount * 26) / 12
          );

        case 'monthly':
          return sum + amount;

        case 'yearly':
          return (
            sum + amount / 12
          );

        default:
          return sum;
      }
    },
    0
  );
}

export function calculateAnnualIncome(
  incomes = []
) {
  return (
    calculateMonthlyIncome(
      incomes
    ) * 12
  );
}

// ===================================================
// ACCOUNT BALANCES
// ===================================================

export function calculateTotalBalance(
  accounts = []
) {
  return accounts.reduce(
    (sum, account) =>
      sum +
      Number(
        account.balance || 0
      ),
    0
  );
}

export function calculateAvailableBalance(
  accounts = []
) {
  return accounts
    .filter(
      (account) =>
        !account.locked
    )
    .reduce(
      (sum, account) =>
        sum +
        Number(
          account.balance || 0
        ),
      0
    );
}

// ===================================================
// EXPENSES
// ===================================================

export function getUpcomingExpenses(
  expenses = [],
  daysAhead = 30
) {
  return expenses.filter(
    (expense) => {
      const days =
        daysUntil(
          expense.dueDate
        );

      return (
        days >= 0 &&
        days <= daysAhead
      );
    }
  );
}

export function calculateMonthlyExpenses(
  expenses = []
) {
  return expenses.reduce(
    (sum, expense) => {
      const amount = Number(
        expense.amount || 0
      );

      switch (
        expense.frequency
      ) {
        case 'weekly':
          return (
            sum +
            (amount * 52) / 12
          );

        case 'fortnightly':
          return (
            sum +
            (amount * 26) / 12
          );

        case 'monthly':
          return sum + amount;

        case 'yearly':
          return (
            sum + amount / 12
          );

        default:
          return sum;
      }
    },
    0
  );
}

// ===================================================
// PAYDAY STACKING ENGINE
// ===================================================

export function calculatePaydayAllocation(
  accounts = [],
  expenses = [],
  incomes = []
) {
  const nextPay =
    getNextPay(incomes);

  if (!nextPay) {
    return {
      nextPayDate: null,
      allocations: [],
      totalDue: 0,
    };
  }

  const payDate = new Date(
    nextPay.nextPayDate
  );

  const allocations = accounts.map(
    (account) => {
      const accountExpenses =
        expenses.filter(
          (expense) =>
            expense.accountId ===
            account.id
        );

      const amountDue =
        accountExpenses.reduce(
          (sum, expense) => {
            const dueDate =
              new Date(
                expense.dueDate
              );

            if (
              dueDate <= payDate
            ) {
              return (
                sum +
                Number(
                  expense.amount ||
                    0
                )
              );
            }

            return sum;
          },
          0
        );

      return {
        accountId: account.id,
        accountName:
          account.name,
        currentBalance:
          Number(
            account.balance ||
              0
          ),
        amountDue,
      };
    }
  );

  const totalDue =
    allocations.reduce(
      (sum, allocation) =>
        sum +
        allocation.amountDue,
      0
    );

  return {
    nextPayDate:
      nextPay.nextPayDate,
    allocations,
    totalDue,
  };
}

// ===================================================
// DISPOSABLE INCOME
// ===================================================

export function calculateDisposableIncome(
  incomes = [],
  expenses = []
) {
  const monthlyIncome =
    calculateMonthlyIncome(
      incomes
    );

  const monthlyExpenses =
    calculateMonthlyExpenses(
      expenses
    );

  return (
    monthlyIncome -
    monthlyExpenses
  );
}

// ===================================================
// 50 / 30 / 20 RULE
// ===================================================

export function calculate503020(
  monthlyIncome = 0
) {
  return {
    need:
      monthlyIncome * 0.5,
    want:
      monthlyIncome * 0.3,
    save:
      monthlyIncome * 0.2,
  };
}

export function calculateBudgetHealth(
  incomes = [],
  expenses = []
) {
  const monthlyIncome =
    calculateMonthlyIncome(
      incomes
    );

  const monthlyExpenses =
    calculateMonthlyExpenses(
      expenses
    );

  const ratio =
    monthlyExpenses /
    monthlyIncome;

  if (ratio < 0.6) {
    return {
      status: 'healthy',
      message:
        'Strong disposable income',
    };
  }

  if (ratio < 0.9) {
    return {
      status: 'warning',
      message:
        'Budget is getting tight',
    };
  }

  return {
    status: 'danger',
    message:
      'Spending exceeds comfort zone',
  };
}

// ===================================================
// CASHFLOW FORECAST
// ===================================================

export function calculateCashflowForecast(
  accounts = [],
  expenses = [],
  incomes = [],
  daysAhead = 30
) {
  const totalBalance =
    calculateTotalBalance(
      accounts
    );

  const upcomingExpenses =
    getUpcomingExpenses(
      expenses,
      daysAhead
    );

  const expenseTotal =
    upcomingExpenses.reduce(
      (sum, expense) =>
        sum +
        Number(
          expense.amount || 0
        ),
      0
    );

  const projectedBalance =
    totalBalance -
    expenseTotal;

  return {
    currentBalance:
      totalBalance,
    projectedBalance,
    upcomingExpenses:
      expenseTotal,
    daysAhead,
  };
}

// ===================================================
// DASHBOARD SUMMARY
// ===================================================

export function getDashboardSummary(
  accounts = [],
  expenses = [],
  incomes = []
) {
  const monthlyIncome =
    calculateMonthlyIncome(
      incomes
    );

  const monthlyExpenses =
    calculateMonthlyExpenses(
      expenses
    );

  const disposableIncome =
    calculateDisposableIncome(
      incomes,
      expenses
    );

  const allocation =
    calculatePaydayAllocation(
      accounts,
      expenses,
      incomes
    );

  const budgetSplit =
    calculate503020(
      monthlyIncome
    );

  return {
    totalBalance:
      calculateTotalBalance(
        accounts
      ),

    monthlyIncome,

    monthlyExpenses,

    disposableIncome,

    paydayAllocation:
      allocation,

    budgetSplit,

    budgetHealth:
      calculateBudgetHealth(
        incomes,
        expenses
      ),
  };
}