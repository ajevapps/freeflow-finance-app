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
// PAY PERIODS
// ======================================

export function getPaysPerYear(
  payFrequency =
    'fortnightly'
) {
  switch (
    payFrequency
  ) {
    case 'weekly':
      return 52;

    case 'fortnightly':
      return 26;

    case 'monthly':
      return 12;

    default:
      return 26;
  }
}

// ======================================
// AUSTRALIAN TAX
// ======================================

export function calculateIncomeTax(
  grossPay = 0,
  payFrequency =
    'fortnightly'
) {
  const annualIncome =
    grossPay *
    getPaysPerYear(
      payFrequency
    );

  let annualTax = 0;

  if (
    annualIncome <=
    18200
  ) {
    annualTax = 0;
  } else if (
    annualIncome <=
    45000
  ) {
    annualTax =
      (annualIncome -
        18200) *
      0.16;
  } else if (
    annualIncome <=
    135000
  ) {
    annualTax =
      4288 +
      (annualIncome -
        45000) *
        0.30;
  } else if (
    annualIncome <=
    190000
  ) {
    annualTax =
      31288 +
      (annualIncome -
        135000) *
        0.37;
  } else {
    annualTax =
      51638 +
      (annualIncome -
        190000) *
        0.45;
  }

  return (
    annualTax /
    getPaysPerYear(
      payFrequency
    )
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
// NET PAY
// ======================================

export function calculateNetIncome(
  income
) {
  const grossPay =
    Number(
      income.amount
    ) || 0;

  const annualIncome =
    calculateAnnualAmount(
      grossPay,
      income.frequency
    );

  const paysPerYear =
    getPaysPerYear(
      income.frequency
    );

  const tax =
    income.calculateTax
      ? calculateIncomeTax(
          grossPay,
          income.frequency
        )
      : 0;

  const medicare =
    income.includeMedicare
      ? calculateMedicareLevy(
          annualIncome
        ) /
        paysPerYear
      : 0;

  const hecs =
    calculateHECS(
      annualIncome,
      income.hasHecs
    ) / paysPerYear;

  const netPay =
    grossPay -
    tax -
    medicare -
    hecs;

  return {
    grossPay,
    taxPerPay: tax,
    medicarePerPay:
      medicare,
    hecsPerPay: hecs,
    netPay,
  };
}

// ======================================
// EXPENSES PER PAY
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
    case payFrequency:
      return amount;

    case 'weekly':
      return payFrequency ===
        'fortnightly'
        ? amount * 2
        : payFrequency ===
          'monthly'
        ? amount * 4.33
        : amount;

    case 'monthly':
      return (
        amount /
        paysInMonth
      );

    case 'yearly':
      return (
        amount /
        getPaysPerYear(
          payFrequency
        )
      );

    default:
      return amount;
  }
}

// ======================================
// TOTALS
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
    (sum, income) => {
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
            net.netPay
          );

        case 'weekly':
          return (
            sum +
            (payFrequency ===
            'fortnightly'
              ? net.netPay *
                2
              : net.netPay *
                4.33)
          );

        case 'monthly':
          return (
            sum +
            net.netPay /
              getPaysInMonth(
                payFrequency
              )
          );

        case 'yearly':
          return (
            sum +
            net.netPay /
              getPaysPerYear(
                payFrequency
              )
          );

        default:
          return (
            sum +
            net.netPay
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