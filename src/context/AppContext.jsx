import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  getDashboardSummary,
} from '../utils/calculations';

const AppContext =
  createContext();

// ======================================
// STORAGE KEYS
// ======================================

const STORAGE_KEYS = {
  accounts:
    'freeflow_accounts',

  expenses:
    'freeflow_expenses',

  incomes:
    'freeflow_incomes',
};

// ======================================
// STORAGE HELPERS
// ======================================

function loadStorage(
  key,
  fallback
) {
  try {
    const data =
      localStorage.getItem(
        key
      );

    if (data) {
      return JSON.parse(data);
    }

    return fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(
  key,
  data
) {
  localStorage.setItem(
    key,
    JSON.stringify(data)
  );
}

// ======================================
// CONTEXT PROVIDER
// ======================================

export function AppProvider({
  children,
}) {
  // ======================================
  // STATE
  // ======================================

  const [accounts, setAccounts] =
    useState(() =>
      loadStorage(
        STORAGE_KEYS.accounts,
        [
          {
            id: 1,
            name:
              'Transaction',
            balance: 2450,
            type:
              'transaction',
          },
          {
            id: 2,
            name: 'Bills',
            balance: 620,
            type: 'bills',
          },
          {
            id: 3,
            name: 'Savings',
            balance: 8400,
            type: 'savings',
          },
        ]
      )
    );

  const [expenses, setExpenses] =
    useState(() =>
      loadStorage(
        STORAGE_KEYS.expenses,
        [
          {
            id: 1,
            name: 'Rent',
            amount: 650,
            dueDate:
              '2026-06-15',
            frequency:
              'fortnightly',
            category:
              'need',
            accountId: 2,
          },
          {
            id: 2,
            name:
              'Netflix',
            amount: 22,
            dueDate:
              '2026-06-09',
            frequency:
              'monthly',
            category:
              'want',
            accountId: 2,
          },
          {
            id: 3,
            name:
              'Emergency Fund',
            amount: 150,
            dueDate:
              '2026-06-14',
            frequency:
              'monthly',
            category:
              'save',
            accountId: 3,
          },
        ]
      )
    );

  const [incomes, setIncomes] =
    useState(() =>
      loadStorage(
        STORAGE_KEYS.incomes,
        [
          {
            id: 1,
            name: 'Salary',
            amount: 2800,
            frequency:
              'fortnightly',
            nextPayDate:
              '2026-06-15',
          },
        ]
      )
    );

  // ======================================
  // AUTO SAVE
  // ======================================

  useEffect(() => {
    saveStorage(
      STORAGE_KEYS.accounts,
      accounts
    );
  }, [accounts]);

  useEffect(() => {
    saveStorage(
      STORAGE_KEYS.expenses,
      expenses
    );
  }, [expenses]);

  useEffect(() => {
    saveStorage(
      STORAGE_KEYS.incomes,
      incomes
    );
  }, [incomes]);

  // ======================================
  // ACCOUNT CRUD
  // ======================================

  const addAccount = (
    account
  ) => {
    setAccounts((prev) => [
      ...prev,
      {
        id:
          crypto.randomUUID(),
        balance: 0,
        ...account,
      },
    ]);
  };

  const updateAccount = (
    id,
    updates
  ) => {
    setAccounts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates,
            }
          : item
      )
    );
  };

  const deleteAccount = (
    id
  ) => {
    setAccounts((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );
  };

  // ======================================
  // EXPENSE CRUD
  // ======================================

  const addExpense = (
    expense
  ) => {
    setExpenses((prev) => [
      ...prev,
      {
        id:
          crypto.randomUUID(),
        ...expense,
      },
    ]);
  };

  const updateExpense = (
    id,
    updates
  ) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates,
            }
          : item
      )
    );
  };

  const deleteExpense = (
    id
  ) => {
    setExpenses((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );
  };

  // ======================================
  // INCOME CRUD
  // ======================================

  const addIncome = (
    income
  ) => {
    setIncomes((prev) => [
      ...prev,
      {
        id:
          crypto.randomUUID(),
        ...income,
      },
    ]);
  };

  const updateIncome = (
    id,
    updates
  ) => {
    setIncomes((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates,
            }
          : item
      )
    );
  };

  const deleteIncome = (
    id
  ) => {
    setIncomes((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );
  };

  // ======================================
  // LIVE CALCULATIONS
  // ======================================

  const dashboard =
    useMemo(() => {
      return getDashboardSummary(
        accounts,
        expenses,
        incomes
      );
    }, [
      accounts,
      expenses,
      incomes,
    ]);

  // ======================================
  // CONTEXT VALUE
  // ======================================

  const value = {
    // State
    accounts,
    expenses,
    incomes,

    // Setters
    setAccounts,
    setExpenses,
    setIncomes,

    // Account CRUD
    addAccount,
    updateAccount,
    deleteAccount,

    // Expense CRUD
    addExpense,
    updateExpense,
    deleteExpense,

    // Income CRUD
    addIncome,
    updateIncome,
    deleteIncome,

    // Dashboard
    dashboard,
  };

  return (
    <AppContext.Provider
      value={value}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(
    AppContext
  );
}