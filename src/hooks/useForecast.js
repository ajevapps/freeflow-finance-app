import { useMemo } from "react";

import {
  calculateMonthlyIncome,
  calculateMonthlyExpenses,
} from "../utils/calculations";

export default function useForecast(
  incomes = [],
  expenses = [],
  startingBalance = 0
) {
  const forecast = useMemo(() => {
    const monthlyIncome =
      calculateMonthlyIncome(incomes);

    const monthlyExpenses =
      calculateMonthlyExpenses(expenses);

    const monthlyNet =
      monthlyIncome - monthlyExpenses;

    const projection = [];

    let currentBalance =
      Number(startingBalance) || 0;

    for (let month = 1; month <= 12; month++) {
      currentBalance += monthlyNet;

      projection.push({
        month,
        balance: currentBalance,
      });
    }

    return projection;
  }, [incomes, expenses, startingBalance]);

  return {
    forecast,
  };
}