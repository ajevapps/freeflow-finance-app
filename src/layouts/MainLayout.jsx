import {
  Outlet,
  NavLink,
} from 'react-router-dom';

function MainLayout() {
  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
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
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="app-title">
            FreeFlow
          </h1>
        </div>

        <nav className="sidebar-nav">
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
      </aside>

      {/* Main App Area */}
      <div className="app-main">
        <main className="page-content">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
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