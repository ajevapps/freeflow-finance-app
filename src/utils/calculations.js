// ======================================
// DATE HELPERS
// ======================================

export function getPaysInMonth(
  payFrequency = 'fortnightly',
  currentDate = new Date()
) {
  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth();

  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  switch (
    payFrequency
  ) {
    case 'weekly':
      return Math.ceil(
        daysInMonth / 7
      );

    case 'fortnightly': {
      const firstDay =
        new Date(
          year,
          month,
          1
        );

      let payCount = 0;

      let current =
        new Date(
          firstDay
        );

      while (
        current.getMonth() ===
        month
      ) {
        payCount++;
        current.setDate(
          current.getDate() +
            14
        );
      }

      return Math.max(
        payCount,
        2
      );
    }

    case 'monthly':
      return 1;

    default:
      return 2;
  }
}

// ======================================
// AUSTRALIAN TAX ENGINE
// ======================================

export function calculateIncomeTax(
  annualIncome = 0
) {
  if (
    annualIncome <=
    18200
  ) {
    return 0;
  }

  if (
    annualIncome <=
    45000
  ) {
    return (
      (annualIncome -
        18200) *
      0.16
    );
  }

  if (
    annualIncome <=
    135000
  ) {
    return (
      4288 +
      (annualIncome -
        45000) *
        0.30
    );
  }

  if (
    annualIncome <=
    190000
  ) {
    return (
      31288 +
      (annualIncome -
        135000) *
        0.37
    );
  }

  return (
    51638 +
    (annualIncome -
      190000) *
      0.45
  );
}

export function calculateMedicareLevy(
  annualIncome = 0,
  enabled = true
) {
  if (!enabled)
    return 0;

  return (
    annualIncome *
    0.02
  );
}

export function calculateHECS(
  annualIncome = 0,
  enabled = null
) {
  const autoEnabled =
    annualIncome >=
    67000;

  const shouldApply =
    enabled === null
      ? autoEnabled
      : enabled;

  if (!shouldApply)
    return 0;

  let rate = 0;

  if (
    annualIncome >=
    67000
  )
    rate = 0.01;

  if (
    annualIncome >=
    75000
  )
    rate = 0.02;

  if (
    annualIncome >=
    85000
  )
    rate = 0.03;

  if (
    annualIncome >=
    95000
  )
    rate = 0.04;

  if (
    annualIncome >=
    105000
  )
    rate = 0.05;

  if (
    annualIncome >=
    120000
  )
    rate = 0.06;

  if (
    annualIncome >=
    135000
  )
    rate = 0.07;

  if (
    annualIncome >=
    150000
  )
    rate = 0.08;

  if (
    annualIncome >=
    170000
  )
    rate = 0.09;

  return (
    annualIncome *
    rate
  );
}

// ======================================
// ANNUAL HELPERS
// ======================================

export function calculateAnnualAmount(
  amount = 0,
  frequency = 'monthly'
) {
  switch (
    frequency
  ) {
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

// ======================================
// NET INCOME
// ======================================

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

  const netAnnual =
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
    netAnnual,
  };
}

// ======================================
// PAY CYCLE ENGINE
// ======================================

export function calculateExpensePerPay(
  expense,
  payFrequency =
    'fortnightly'
) {
  const amount =
    Number(
      expense.amount
    ) || 0;

  const paysInMonth =
    getPaysInMonth(
      payFrequency
    );

  switch (
    expense.frequency
  ) {
    // same cycle
    case payFrequency:
      return amount;

    // weekly
    case 'weekly':
      return payFrequency ===
        'fortnightly'
        ? amount * 2
        : payFrequency ===
          'monthly'
        ? amount * 4.33
        : amount;

    // monthly
    case 'monthly':
      return (
        amount /
        paysInMonth
      );

    // yearly
    case 'yearly': {
      const yearlyPays =
        payFrequency ===
        'weekly'
          ? 52
          : payFrequency ===
            'fortnightly'
          ? 26
          : 12;

      return (
        amount /
        yearlyPays
      );
    }

    default:
      return amount;
  }
}

// ======================================
// PAYDAY TOTALS
// ======================================

export function calculateBillsThisPay(
  expenses = [],
  payFrequency =
    'fortnightly'
) {
  return expenses.reduce(
    (sum, expense) =>
      sum +
      calculateExpensePerPay(
        expense,
        payFrequency
      ),
    0
  );
}

export function calculateIncomeThisPay(
  incomes = [],
  payFrequency =
    'fortnightly'
) {
  return incomes.reduce(
    (
      sum,
      income
    ) => {
      const net =
        calculateNetIncome(
          income
        );

      switch (
        income.frequency
      ) {
        case payFrequency:
          return (
            sum +
            income.amount
          );

        case 'weekly':
          return (
            sum +
            (payFrequency ===
            'fortnightly'
              ? income.amount *
                2
              : income.amount *
                4.33)
          );

        case 'monthly':
          return (
            sum +
            income.amount /
              getPaysInMonth(
                payFrequency
              )
          );

        case 'yearly':
          return (
            sum +
            net.netAnnual /
              (payFrequency ===
              'weekly'
                ? 52
                : payFrequency ===
                  'fortnightly'
                ? 26
                : 12)
          );

        default:
          return (
            sum +
            income.amount
          );
      }
    },
    0
  );
}

// ======================================
// DASHBOARD
// ======================================

export function getDashboardSummary(
  accounts = [],
  expenses = [],
  incomes = [],
  payFrequency =
    'fortnightly'
) {
  const totalBalance =
    accounts.reduce(
      (
        sum,
        account
      ) =>
        sum +
        Number(
          account.balance
        ),
      0
    );

  const incomeThisPay =
    calculateIncomeThisPay(
      incomes,
      payFrequency
    );

  const billsThisPay =
    calculateBillsThisPay(
      expenses,
      payFrequency
    );

  const disposableIncome =
    incomeThisPay -
    billsThisPay;

  return {
    totalBalance,
    incomeThisPay,
    billsThisPay,
    disposableIncome,

    budgetHealth:
      disposableIncome >
      1000
        ? {
            status:
              'healthy',
            message:
              'Strong cashflow.',
          }
        : disposableIncome >
          300
        ? {
            status:
              'warning',
            message:
              'Budget getting tight.',
          }
        : {
            status:
              'danger',
            message:
              'Risk of shortfall.',
          },
  };
}