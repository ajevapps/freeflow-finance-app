import { useApp } from '../context/AppContext';

function Dashboard() {
  const { dashboard } =
    useApp();

  const {
    disposableIncome,
    paydayAllocation,
    budgetSplit,
  } = dashboard;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">
          Dashboard
        </h1>

        <p className="page-subtitle">
          Your next pay breakdown
          and spending overview.
        </p>
      </div>

      <div className="dashboard-grid">
        {/* Accounts */}
        <div className="card">
          <div className="card-header">
            <h2>
              Due Next Pay
            </h2>

            <p className="page-subtitle">
              Account funding
            </p>
          </div>

          <div className="account-list">
            {paydayAllocation.allocations.map(
              (
                account
              ) => (
                <div
                  key={
                    account.accountId
                  }
                  className="account-row"
                >
                  <div>
                    <p className="account-name">
                      {
                        account.accountName
                      }
                    </p>

                    <p className="account-balance">
                      Current: $
                      {account.currentBalance.toLocaleString()}
                    </p>
                  </div>

                  <div className="account-due">
                    +$
                    {account.amountDue.toLocaleString()}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Disposable */}
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
            Available after
            expenses
          </p>
        </div>
      </div>

      {/* Budget Split */}
      <div className="card budget-card">
        <div className="card-header">
          <h2>
            50 / 30 / 20 Budget
          </h2>
        </div>

        <div className="budget-split">
          <div className="budget-item">
            <div className="budget-circle need">
              50%
            </div>

            <h3>Need</h3>

            <p>
              $
              {budgetSplit.need.toFixed(
                0
              )}
            </p>
          </div>

          <div className="budget-item">
            <div className="budget-circle want">
              30%
            </div>

            <h3>Want</h3>

            <p>
              $
              {budgetSplit.want.toFixed(
                0
              )}
            </p>
          </div>

          <div className="budget-item">
            <div className="budget-circle save">
              20%
            </div>

            <h3>Save</h3>

            <p>
              $
              {budgetSplit.save.toFixed(
                0
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;