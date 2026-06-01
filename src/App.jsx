import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import Bills from "./pages/Bills";
import Savings from "./pages/Savings";
import Debt from "./pages/Debt";
import Forecast from "./pages/Forecast";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="income" element={<Income />} />
        <Route path="bills" element={<Bills />} />
        <Route path="savings" element={<Savings />} />
        <Route path="debt" element={<Debt />} />
        <Route path="forecast" element={<Forecast />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}