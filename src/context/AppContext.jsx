import { createContext, useContext, useState } from "react";

import {
  accounts as initialAccounts,
  incomes as initialIncomes,
  expenses as initialExpenses,
  bills as initialBills,
  savingsGoals as initialSavingsGoals,
  debts as initialDebts,
} from "../data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [accounts, setAccounts] =
    useState(initialAccounts);

  const [incomes, setIncomes] =
    useState(initialIncomes);

  const [expenses, setExpenses] =
    useState(initialExpenses);

  const [bills, setBills] =
    useState(initialBills);

  const [savingsGoals, setSavingsGoals] =
    useState(initialSavingsGoals);

  const [debts, setDebts] =
    useState(initialDebts);

  const value = {
    accounts,
    setAccounts,

    incomes,
    setIncomes,

    expenses,
    setExpenses,

    bills,
    setBills,

    savingsGoals,
    setSavingsGoals,

    debts,
    setDebts,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext must be used inside AppProvider"
    );
  }

  return context;
}