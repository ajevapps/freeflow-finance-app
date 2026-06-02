import { useApp } from '../context/AppContext';

function Settings() {
  const {
    settings,
    updateSettings,
  } = useApp();

  const handleReset = () => {
    const confirmed =
      window.confirm(
        'Reset all FreeFlow data?'
      );

    if (!confirmed)
      return;

    localStorage.clear();

    window.location.reload();
  };

  return (
    <div className="page">
      <div className="settings-grid">
        <div className="card">
          <div className="card-header">
            <h2>
              Pay Cycle
            </h2>
          </div>

          <p className="page-subtitle">
            Choose your
            primary pay
            frequency.
          </p>

          <select
            value={
              settings.payFrequency
            }
            onChange={(
              e
            ) =>
              updateSettings({
                payFrequency:
                  e.target
                    .value,
              })
            }
          >
            <option value="weekly">
              Weekly
            </option>

            <option value="fortnightly">
              Fortnightly
            </option>

            <option value="monthly">
              Monthly
            </option>
          </select>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>
              Data
            </h2>
          </div>

          <p className="page-subtitle">
            Reset all stored
            FreeFlow data.
          </p>

          <button
            className="danger-button"
            onClick={
              handleReset
            }
          >
            Reset App
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;