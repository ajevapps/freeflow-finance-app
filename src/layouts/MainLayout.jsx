import { Outlet, NavLink } from 'react-router-dom';

function MainLayout() {
  const navItems = [
    {
      label: 'Home',
      path: '/',
      icon: '🏠',
    },
    {
      label: 'Accounts',
      path: '/accounts',
      icon: '💰',
    },
    {
      label: 'Income',
      path: '/income',
      icon: '💸',
    },
    {
      label: 'Expenses',
      path: '/expenses',
      icon: '📅',
    },
    {
      label: 'Forecast',
      path: '/forecast',
      icon: '📈',
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: '⚙️',
    },
  ];

  return (
    <div className="app-shell">
      {/* Top Header */}
      <header className="top-bar">
        <h1 className="app-title">
          FreeFlow
        </h1>
      </header>

      {/* Main Content */}
      <main className="page-content">
        <Outlet />
      </main>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        {navItems.map(
          (item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({
                isActive,
              }) =>
                `nav-item ${
                  isActive
                    ? 'active'
                    : ''
                }`
              }
            >
              <span className="nav-icon">
                {
                  item.icon
                }
              </span>

              <span className="nav-label">
                {
                  item.label
                }
              </span>
            </NavLink>
          )
        )}
      </nav>
    </div>
  );
}

export default MainLayout;