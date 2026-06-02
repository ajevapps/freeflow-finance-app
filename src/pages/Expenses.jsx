import { useState } from 'react';
import { useApp } from '../context/AppContext';

function Expenses() {
  const {
    expenses,
    accounts,
    addExpense,
    updateExpense,
    deleteExpense,
  } = useApp();

  const emptyForm = {
    name: '',
    amount: '',
    dueDate: '',
    frequency:
      'monthly',
    category: 'need',
    accountId: '',
  };

  const [form, setForm] =
    useState(emptyForm);

  const [
    editingId,
    setEditingId,
  ] = useState(null);

  const handleChange = (
    e
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.amount ||
      !form.dueDate ||
      !form.accountId
    ) {
      return;
    }

    const payload = {
      ...form,
      amount: Number(
        form.amount
      ),
      accountId:
        Number(
          form.accountId
        ),
    };

    if (editingId) {
      updateExpense(
        editingId,
        payload
      );
    } else {
      addExpense(payload);
    }

    resetForm();
  };

  const handleEdit = (
    expense
  ) => {
    setEditingId(
      expense.id
    );

    setForm({
      name: expense.name,
      amount:
        expense.amount,
      dueDate:
        expense.dueDate,
      frequency:
        expense.frequency,
      category:
        expense.category,
      accountId:
        String(
          expense.accountId
        ),
    });

    window.scrollTo({
      top: 0,
      behavior:
        'smooth',
    });
  };

  const getAccountName = (
    accountId
  ) => {
    const account =
      accounts.find(
        (a) =>
          a.id ===
          accountId
      );

    return (
      account?.name ||
      'Unknown'
    );
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">
          Expenses
        </h1>

        <p className="page-subtitle">
          Manage recurring
          expenses and payday
          allocations.
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>
            {editingId
              ? 'Edit Expense'
              : 'Add Expense'}
          </h2>
        </div>

        <form
          className="expense-form"
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="text"
            name="name"
            placeholder="Expense name"
            value={form.name}
            onChange={
              handleChange
            }
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={
              form.amount
            }
            onChange={
              handleChange
            }
          />

          <input
            type="date"
            name="dueDate"
            value={
              form.dueDate
            }
            onChange={
              handleChange
            }
          />

          <select
            name="frequency"
            value={
              form.frequency
            }
            onChange={
              handleChange
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
            <option value="yearly">
              Yearly
            </option>
          </select>

          <select
            name="category"
            value={
              form.category
            }
            onChange={
              handleChange
            }
          >
            <option value="need">
              Need
            </option>
            <option value="want">
              Want
            </option>
            <option value="save">
              Save
            </option>
          </select>

          <select
            name="accountId"
            value={
              form.accountId
            }
            onChange={
              handleChange
            }
          >
            <option value="">
              Select Account
            </option>

            {accounts.map(
              (
                account
              ) => (
                <option
                  key={
                    account.id
                  }
                  value={
                    account.id
                  }
                >
                  {
                    account.name
                  }
                </option>
              )
            )}
          </select>

          <button
            type="submit"
            className="primary-button"
          >
            {editingId
              ? 'Update Expense'
              : 'Add Expense'}
          </button>

          {editingId && (
            <button
              type="button"
              className="danger-button"
              onClick={
                resetForm
              }
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div
        className="card"
        style={{
          marginTop: '1.5rem',
        }}
      >
        <div className="card-header">
          <h2>
            Your Expenses
          </h2>
        </div>

        <div className="account-list">
          {expenses.map(
            (
              expense
            ) => (
              <div
                key={
                  expense.id
                }
                className="account-row"
              >
                <div>
                  <p className="account-name">
                    {
                      expense.name
                    }
                  </p>

                  <p className="account-balance">
                    $
                    {expense.amount.toLocaleString()}
                    {' • '}
                    {
                      expense.frequency
                    }
                  </p>

                  <p className="page-subtitle">
                    Due{' '}
                    {
                      expense.dueDate
                    }
                    {' • '}
                    {
                      expense.category
                    }
                    {' • '}
                    {
                      getAccountName(
                        expense.accountId
                      )
                    }
                  </p>
                </div>

                <div className="account-actions">
                  <button
                    className="primary-button"
                    onClick={() =>
                      handleEdit(
                        expense
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="danger-button"
                    onClick={() =>
                      deleteExpense(
                        expense.id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Expenses;