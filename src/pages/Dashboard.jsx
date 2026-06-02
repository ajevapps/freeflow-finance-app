function Dashboard() {
  // Placeholder data for now
  const accounts = [
    {
      id: 1,
      name: 'Transaction',
      balance: 1240,
      dueOnPay: 450,
    },
    {
      id: 2,
      name: 'Savings',
      balance: 8500,
      dueOnPay: 150,
    },
    {
      id: 3,
      name: 'Bills',
      balance: 320,
      dueOnPay: 620,
    },
    {
      id: 4,
      name: 'Car',
      balance: 1900,
      dueOnPay: 80,
    },
  ];

  const disposableIncome = 742.5;

  const totalAllocation = 50 + 30 + 20;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Your next pay breakdown and spending overview.
        </p>
      </div>

      <div className="dashboard-grid">
        {/* Accounts + Due On Pay */}
        <div className="card">
          <div className="card-header">
            <h2>Accounts</h2>
            <p className="page-subtitle">
              Amount due next payday
            </p>
          </div>

          <div className="account-list">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="account-row"
              >
                <div>
                  <p className="account-name">
                    {account.name}
                  </p>
                  <p className="account-balance">
                    $
                    {account.balance.toLocaleString()}
                  </p>
                </div>

                <div className="account-due">
                  +$
                  {account.dueOnPay.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disposable Income */}
        <div className="card disposable-card">
          <p className="card-label">
            Disposable Income
          </p>

          <h2 className="card-value">
            $
            {disposableIncome.toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
              }
            )}
          </h2>

          <p className="page-subtitle">
            Available after bills and
            savings
          </p>
        </div>
      </div>

      {/* Budget Split */}
      <div className="card budget-card">
        <div className="card-header">
          <h2>50 / 30 / 20 Budget</h2>
          <p className="page-subtitle">
            Needs, wants and savings split
          </p>
        </div>

        <div className="budget-split">
          <div className="budget-item">
            <div className="budget-circle need">
              50%
            </div>
            <h3>Need</h3>
          </div>

          <div className="budget-item">
            <div className="budget-circle want">
              30%
            </div>
            <h3>Want</h3>
          </div>

          <div className="budget-item">
            <div className="budget-circle save">
              20%
            </div>
            <h3>Save</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;