import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useApp } from '../context/AppContext';

function Dashboard() {
  const {
    dashboard,
    expenses = [],
    accounts = [],
    settings = {},
  } = useApp() || {};

  const {
    incomeThisPay = 0,
    billsThisPay = 0,
    disposableIncome = 0,
    budgetHealth = {
      status: 'healthy',
      message:
        'Everything looks good.',
    },
  } = dashboard || {};

  const categoryTotals =
    expenses.reduce(
      (
        totals,
        expense
      ) => {
        const amount =
          Number(
            expense.amount
          ) || 0;

        const category =
          expense.category?.toLowerCase();

        if (
          totals[
            category
          ] !== undefined
        ) {
          totals[
            category
          ] += amount;
        }

        return totals;
      },
      {
        need: 0,
        want: 0,
        save: 0,
      }
    );

  const chartData = [
    {
      name: 'Need',
      value:
        categoryTotals.need,
    },
    {
      name: 'Want',
      value:
        categoryTotals.want,
    },
    {
      name: 'Save',
      value:
        categoryTotals.save,
    },
  ];

  const COLORS = [
    '#f59e0b',
    '#3b82f6',
    '#22c55e',
  ];

  const formatCurrency = (
    value = 0
  ) =>
    Number(
      value
    ).toLocaleString(
      'en-AU',
      {
        style: 'currency',
        currency: 'AUD',
      }
    );

  return (
    <div className="page">
      {/* TOP CARDS */}
      <div className="dashboard-grid">
        <div className="card">
          <p className="card-label">
            Income This Pay
          </p>

          <h2 className="card-value">
            {formatCurrency(
              incomeThisPay
            )}
          </h2>

          <p className="page-subtitle">
            {
              settings.payFrequency
            } income
          </p>
        </div>

        <div className="card">
          <p className="card-label">
            Bills This Pay
          </p>

          <h2 className="card-value">
            {formatCurrency(
              billsThisPay
            )}
          </h2>

          <p className="page-subtitle">
            Split across your
            pay cycle
          </p>
        </div>

        <div className="card">
          <p className="card-label">
            Disposable
          </p>

          <h2 className="card-value">
            {formatCurrency(
              disposableIncome
            )}
          </h2>

          <p className="page-subtitle">
            After allocations
          </p>
        </div>
      </div>

      {/* FUND THESE ACCOUNTS */}
      <div
        className="card"
        style={{
          marginTop: '1.5rem',
        }}
      >
        <div className="card-header">
          <h2>
            Fund These
            Accounts
          </h2>
        </div>

        <div className="account-list">
          {accounts.map(
            (account) => {
              const neededThisPay =
                expenses
                  .filter(
                    (
                      expense
                    ) =>
                      expense.accountId ===
                      account.id
                  )
                  .reduce(
                    (
                      total,
                      expense
                    ) =>
                      total +
                      (Number(
                        expense.payAllocation
                      ) || 0),
                    0
                  );

              return (
                <div
                  key={
                    account.id
                  }
                  className="account-row"
                >
                  <div>
                    <p className="account-name">
                      {
                        account.name
                      }
                    </p>

                    <p className="page-subtitle">
                      Needed
                      this pay
                    </p>
                  </div>

                  <strong>
                    {formatCurrency(
                      neededThisPay
                    )}
                  </strong>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* BUDGET HEALTH */}
      <div
        className="card"
        style={{
          marginTop: '1.5rem',
        }}
      >
        <div className="card-header">
          <h2>
            Budget Health
          </h2>
        </div>

        <div
          className={`health-card ${
            budgetHealth.status
          }`}
        >
          <h3>
            {budgetHealth.status ===
            'healthy'
              ? 'Healthy'
              : budgetHealth.status ===
                'warning'
              ? 'Warning'
              : 'High Risk'}
          </h3>

          <p>
            {
              budgetHealth.message
            }
          </p>
        </div>
      </div>

      {/* SPENDING SPLIT */}
      <div
        className="card"
        style={{
          marginTop: '1.5rem',
        }}
      >
        <div className="card-header">
          <h2>
            Need / Want /
            Save
          </h2>
        </div>

        <div
          style={{
            width: '100%',
            height: 320,
          }}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={
                  chartData
                }
                dataKey="value"
                outerRadius={
                  100
                }
              >
                {chartData.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;