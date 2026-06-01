export function convertToMonthly(amount, frequency) {
  if (!amount || !frequency) return 0;

  const multipliers = {
    Weekly: 52 / 12,
    Fortnightly: 26 / 12,
    Monthly: 1,
    Quarterly: 1 / 3,
    Yearly: 1 / 12,
  };

  return amount * (multipliers[frequency] || 1);
}

/**
 * Convert income frequency to yearly amount
 */
export function convertToYearly(amount, frequency) {
  if (!amount || !frequency) return 0;

  const multipliers = {
    Weekly: 52,
    Fortnightly: 26,
    Monthly: 12,
    Quarterly: 4,
    Yearly: 1,
  };

  return amount * (multipliers[frequency] || 1);
}

/**
 * Calculate total account balance
 */
export function calculateTotalBalance(accounts = []) {
  return accounts.reduce(
    (total, account) => total + (Number(account.balance) || 0),
    0
  );
}

/**
 * Calculate total monthly income
 */
export function calculateMonthlyIncome(incomes = []) {
  return incomes.reduce((total, income) => {
    return (
      total +
      convertToMonthly(
        Number(income.amount),
        income.frequency
      )
    );
  }, 0);
}

/**
 * Calculate total monthly expenses
 */
export function calculateMonthlyExpenses(expenses = []) {
  return expenses.reduce((total, expense) => {
    return (
      total +
      convertToMonthly(
        Number(expense.amount),
        expense.frequency
      )
    );
  }, 0);
}

/**
 * Calculate disposable income
 */
export function calculateDisposableIncome(
  income,
  expenses
) {
  return income - expenses;
}

/**
 * Calculate savings progress %
 */
export function calculateSavingsProgress(
  currentAmount,
  targetAmount
) {
  if (!targetAmount || targetAmount <= 0) {
    return 0;
  }

  return Math.min(
    (currentAmount / targetAmount) * 100,
    100
  );
}

/**
 * Calculate debt remaining
 */
export function calculateDebtRemaining(
  totalDebt,
  paidAmount
) {
  return Math.max(totalDebt - paidAmount, 0);
}

/**
 * Calculate net worth
 */
export function calculateNetWorth(
  assets = [],
  liabilities = []
) {
  const totalAssets = assets.reduce(
    (sum, item) => sum + (Number(item.balance) || 0),
    0
  );

  const totalLiabilities = liabilities.reduce(
    (sum, item) => sum + (Number(item.balance) || 0),
    0
  );

  return totalAssets - totalLiabilities;
}