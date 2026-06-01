import { useMemo } from "react";

import {
  calculateMonthlyIncome,
  calculateMonthlyExpenses,
  calculateDisposableIncome,
} from "../utils/calculations";

export default function useBudget(
  incomes = [],
  expenses = []
) {
  const monthlyIncome = useMemo(() => {
    return calculateMonthlyIncome(incomes);
  }, [incomes]);

  const monthlyExpenses = useMemo(() => {
    return calculateMonthlyExpenses(expenses);
  }, [expenses]);

  const disposableIncome = useMemo(() => {
    return calculateDisposableIncome(
      monthlyIncome,
      monthlyExpenses
    );
  }, [monthlyIncome, monthlyExpenses]);

  return {
    monthlyIncome,
    monthlyExpenses,
    disposableIncome,
  };
}