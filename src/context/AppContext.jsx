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
// STORAGE
// ======================================

const STORAGE_KEYS = {
  accounts:
    'freeflow_accounts',

  expenses:
    'freeflow_expenses',

  incomes:
    'freeflow_incomes',

  settings:
    'freeflow_settings',
};

function loadStorage(
  key,
  fallback
) {
  try {
    const data =
      localStorage.getItem(
        key
      );

    return data
      ? JSON.parse(data)
      : fallback;
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
        []
      )
    );

  const [incomes, setIncomes] =
    useState(() =>
      loadStorage(
        STORAGE_KEYS.incomes,
        []
      )
    );

  const [settings, setSettings] =
    useState(() =>
      loadStorage(
        STORAGE_KEYS.settings,
        {
          payFrequency:
            'fortnightly',
        }
      )
    );

  // ======================================
  // PERSISTENCE
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

  useEffect(() => {
    saveStorage(
      STORAGE_KEYS.settings,
      settings
    );
  }, [settings]);

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
  // SETTINGS
  // ======================================

  const updateSettings = (
    updates
  ) => {
    setSettings((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // ======================================
  // DASHBOARD
  // ======================================

  const dashboard =
    useMemo(() => {
      return getDashboardSummary(
        accounts,
        expenses,
        incomes,
        settings?.payFrequency
      );
    }, [
      accounts,
      expenses,
      incomes,
      settings,
    ]);

  const value = {
    accounts,
    expenses,
    incomes,
    settings,

    dashboard,

    addAccount,
    updateAccount,
    deleteAccount,

    addExpense,
    updateExpense,
    deleteExpense,

    addIncome,
    updateIncome,
    deleteIncome,

    updateSettings,
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