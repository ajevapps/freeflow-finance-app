import { Outlet, NavLink } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>FreeFlow</h2>

        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/expenses">Expenses</NavLink>
          <NavLink to="/income">Income</NavLink>
          <NavLink to="/accounts">Accounts</NavLink>
          <NavLink to="/forecast">Forecast</NavLink>
          <NavLink to="/savings">Savings</NavLink>
          <NavLink to="/reports">Reports</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;