import { useState } from 'react';
import { useApp } from '../context/AppContext';

function Accounts() {
  const {
    accounts,
    addAccount,
    deleteAccount,
  } = useApp();

  const [name, setName] =
    useState('');

  const [balance, setBalance] =
    useState('');

  const [type, setType] =
    useState('transaction');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    addAccount({
      name,
      balance:
        Number(balance) || 0,
      type,
    });

    setName('');
    setBalance('');
    setType('transaction');
  };

  return (
    <div className="page">
      <div className="page-header">
      </div>

      {/* Add Account */}
      <div className="card">
        <div className="card-header">
          <h2>Add Account</h2>
        </div>

        <form
          className="account-form"
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="text"
            placeholder="Account name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Balance"
            value={balance}
            onChange={(e) =>
              setBalance(
                e.target.value
              )
            }
          />

          <select
            value={type}
            onChange={(e) =>
              setType(
                e.target.value
              )
            }
          >
            <option value="transaction">
              Transaction
            </option>

            <option value="bills">
              Bills
            </option>

            <option value="savings">
              Savings
            </option>

            <option value="offset">
              Offset
            </option>
          </select>

          <button
            type="submit"
            className="primary-button"
          >
            Add Account
          </button>
        </form>
      </div>

      {/* Account List */}
      <div
        className="card"
        style={{
          marginTop: '1.5rem',
        }}
      >
        <div className="card-header">
          <h2>
            Your Accounts
          </h2>
        </div>

        {accounts.length ===
        0 ? (
          <p className="page-subtitle">
            No accounts added yet.
          </p>
        ) : (
          <div className="account-list">
            {accounts.map(
              (account) => (
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

                    <p className="account-balance">
                      $
                      {Number(
                        account.balance
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div
                    className="account-actions"
                  >
                    <span
                      className="account-type"
                    >
                      {
                        account.type
                      }
                    </span>

                    <button
                      onClick={() =>
                        deleteAccount(
                          account.id
                        )
                      }
                      className="danger-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Accounts;