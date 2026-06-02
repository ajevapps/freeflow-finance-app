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
// AUSTRALIAN TAX ENGINE
// ===================================================

export function calculateIncomeTax(
  annualIncome = 0
) {
  if (annualIncome <= 18200) {
    return 0;
  }

  if (annualIncome <= 45000) {
    return (
      (annualIncome - 18200) *
      0.16
    );
  }

  if (annualIncome <= 135000) {
    return (
      4288 +
      (annualIncome - 45000) *
        0.30
    );
  }

  if (annualIncome <= 190000) {
    return (
      31288 +
      (annualIncome - 135000) *
        0.37
    );
  }

  return (
    51638 +
    (annualIncome - 190000) *
      0.45
  );
}

// ===================================================
// MEDICARE LEVY
// ===================================================

export function calculateMedicareLevy(
  annualIncome = 0,
  enabled = true
) {
  if (!enabled) return 0;

  return annualIncome * 0.02;
}

// ===================================================
// HECS / HELP
// Simplified v1 table
// ===================================================

export function calculateHECS(
  annualIncome = 0,
  enabled = false
) {
  if (!enabled) return 0;

  let rate = 0;

  if (annualIncome >= 54000)
    rate = 0.01;
  if (annualIncome >= 62000)
    rate = 0.02;
  if (annualIncome >= 70000)
    rate = 0.03;
  if (annualIncome >= 80000)
    rate = 0.04;
  if (annualIncome >= 90000)
    rate = 0.05;
  if (annualIncome >= 100000)
    rate = 0.06;
  if (annualIncome >= 110000)
    rate = 0.07;
  if (annualIncome >= 125000)
    rate = 0.08;
  if (annualIncome >= 145000)
    rate = 0.09;
  if (annualIncome >= 160000)
    rate = 0.10;

  return annualIncome * rate;
}

// ===================================================
// NET INCOME
// ===================================================

export function calculateNetIncome(
  income
) {
  const grossAnnual =
    calculateAnnualAmount(
      income.amount,
      income.frequency
    );

  const tax =
    income.calculateTax
      ? calculateIncomeTax(
          grossAnnual
        )
      : 0;

  const medicare =
    calculateMedicareLevy(
      grossAnnual,
      income.includeMedicare
    );

  const hecs =
    calculateHECS(
      grossAnnual,
      income.hasHecs
    );

  const annualNet =
    grossAnnual -
    tax -
    medicare -
    hecs;

  return {
    grossAnnual,

    taxAnnual: tax,

    medicareAnnual:
      medicare,

    hecsAnnual: hecs,

    netAnnual: annualNet,
  };
}

// ===================================================
// FREQUENCY HELPERS
// ===================================================

export function calculateAnnualAmount(
  amount = 0,
  frequency = 'monthly'
) {
  switch (frequency) {
    case 'weekly':
      return amount * 52;

    case 'fortnightly':
      return amount * 26;

    case 'monthly':
      return amount * 12;

    case 'yearly':
      return amount;

    default:
      return amount;
  }
}

export function annualToMonthly(
  amount = 0
) {
  return amount / 12;
}

// ===================================================
// INCOME
// ===================================================

export function calculateMonthlyIncome(
  incomes = []
) {
  return incomes.reduce(
    (sum, income) => {
      const net =
        calculateNetIncome(
          income
        );

      return (
        sum +
        annualToMonthly(
          net.netAnnual
        )
      );
    },
    0
  );
}

export function calculateAnnualIncome(
  incomes = []
) {
  return incomes.reduce(
    (sum, income) => {
      const net =
        calculateNetIncome(
          income
        );

      return (
        sum +
        net.netAnnual
      );
    },
    0
  );
}

// ===================================================
// TAX TOTALS
// ===================================================

export function calculateTaxTotals(
  incomes = []
) {
  return incomes.reduce(
    (
      totals,
      income
    ) => {
      const net =
        calculateNetIncome(
          income
        );

      totals.tax +=
        net.taxAnnual;

      totals.hecs +=
        net.hecsAnnual;

      totals.medicare +=
        net.medicareAnnual;

      return totals;
    },
    {
      tax: 0,
      hecs: 0,
      medicare: 0,
    }
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