import { useApp } from '../context/AppContext';

function Forecast() {
  const {
    dashboard,
    accounts,
    expenses,
    incomes,
  } = useApp();

  const {
    totalBalance,
    disposableIncome,
    paydayAllocation,
    budgetHealth,
  } = dashboard;

  const projectedBalance =
    totalBalance -
    paydayAllocation.totalDue;

  const nextPay =
    incomes.length > 0
      ? incomes[0]
      : null;

  const nextPayAmount =
    nextPay?.amount || 0;

  const futureBalance =
    projectedBalance +
    nextPayAmount;

  const formatCurrency = (
    value
  ) => {
    return value.toLocaleString(
      'en-AU',
      {
        style: 'currency',
        currency: 'AUD',
      }
    );
  };

  const formatDate = (
    date
  ) => {
    if (!date)
      return 'No pay date';

    return new Date(
      date
    ).toLocaleDateString(
      'en-AU',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }
    );
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">
          Forecast
        </h1>

        <p className="page-subtitle">
          See your future cash
          position and upcoming
          financial pressure.
        </p>
      </div>

      {/* Top Summary */}
      <div className="dashboard-grid">
        <div className="card">
          <p className="card-label">
            Current Balance
          </p>

          <h2 className="card-value">
            {formatCurrency(
              totalBalance
            )}
          </h2>

          <p className="page-subtitle">
            Across all accounts
          </p>
        </div>

        <div className="card">
          <p className="card-label">
            Upcoming Expenses
          </p>

          <h2 className="card-value">
            -
            {formatCurrency(
              paydayAllocation.totalDue
            )}
          </h2>

          <p className="page-subtitle">
            Due before next pay
          </p>
        </div>

        <div className="card">
          <p className="card-label">
            Projected Balance
          </p>

          <h2 className="card-value">
            {formatCurrency(
              projectedBalance
            )}
          </h2>

          <p className="page-subtitle">
            After expenses
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div
        className="card"
        style={{
          marginTop: '1.5rem',
        }}
      >
        <div className="card-header">
          <h2>
            Cashflow Timeline
          </h2>
        </div>

        <div className="forecast-timeline">
          <div className="timeline-item">
            <div>
              <h3>Today</h3>

              <p className="page-subtitle">
                Current
                position
              </p>
            </div>

            <strong>
              {formatCurrency(
                totalBalance
              )}
            </strong>
          </div>

          <div className="timeline-item">
            <div>
              <h3>
                Before Pay
              </h3>

              <p className="page-subtitle">
                Expenses due
              </p>
            </div>

            <strong>
              -
              {formatCurrency(
                paydayAllocation.totalDue
              )}
            </strong>
          </div>

          {nextPay && (
            <div className="timeline-item">
              <div>
                <h3>
                  Next Pay
                </h3>

                <p className="page-subtitle">
                  {formatDate(
                    nextPay.nextPayDate
                  )}
                </p>
              </div>

              <strong>
                +
                {formatCurrency(
                  nextPayAmount
                )}
              </strong>
            </div>
          )}

          <div className="timeline-item">
            <div>
              <h3>
                Projected
              </h3>

              <p className="page-subtitle">
                Estimated
                balance
              </p>
            </div>

            <strong>
              {formatCurrency(
                futureBalance
              )}
            </strong>
          </div>
        </div>
      </div>

      {/* Budget Health */}
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
          className={`health-card ${budgetHealth.status}`}
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

        <div
          style={{
            marginTop:
              '1rem',
          }}
        >
          <p className="card-label">
            Disposable Income
          </p>

          <h2 className="card-value">
            {formatCurrency(
              disposableIncome
            )}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Forecast;