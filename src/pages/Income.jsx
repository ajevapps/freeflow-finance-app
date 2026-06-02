import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateNetIncome } from '../utils/calculations';

function Income() {
  const {
    incomes,
    addIncome,
    updateIncome,
    deleteIncome,
  } = useApp();

  const emptyForm = {
    name: '',
    amount: '',
    frequency: 'fortnightly',
    nextPayDate: '',
    calculateTax: true,
    includeMedicare: true,
    hasHecs: false,
  };

  const [form, setForm] =
    useState(emptyForm);

  const [editingId, setEditingId] =
    useState(null);

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.amount ||
      !form.nextPayDate
    ) {
      return;
    }

    const payload = {
      ...form,
      amount: Number(
        form.amount
      ),
    };

    if (editingId) {
      updateIncome(
        editingId,
        payload
      );
    } else {
      addIncome(payload);
    }

    resetForm();
  };

  const handleEdit = (
    income
  ) => {
    setEditingId(
      income.id
    );

    setForm({
      name: income.name,
      amount:
        income.amount,
      frequency:
        income.frequency,
      nextPayDate:
        income.nextPayDate,
      calculateTax:
        income.calculateTax ??
        true,
      includeMedicare:
        income.includeMedicare ??
        true,
      hasHecs:
        income.hasHecs ??
        false,
    });

    window.scrollTo({
      top: 0,
      behavior:
        'smooth',
    });
  };

  const taxPreview =
    calculateNetIncome({
      ...form,
      amount:
        Number(
          form.amount
        ) || 0,
    });

  const formatCurrency = (
    value
  ) =>
    value.toLocaleString(
      'en-AU',
      {
        style: 'currency',
        currency: 'AUD',
      }
    );

  const formatDate = (
    date
  ) =>
    new Date(
      date
    ).toLocaleDateString(
      'en-AU',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }
    );

  return (
    <div className="page">
      <div className="page-header">
      </div>

      {/* FORM */}
      <div className="card">
        <div className="card-header">
          <h2>
            {editingId
              ? 'Edit Income'
              : 'Add Income'}
          </h2>
        </div>

        <form
          className="income-form"
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="text"
            name="name"
            placeholder="Income name"
            value={form.name}
            onChange={
              handleChange
            }
          />

          <input
            type="number"
            name="amount"
            placeholder="Gross amount"
            value={
              form.amount
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

          <input
            type="date"
            name="nextPayDate"
            value={
              form.nextPayDate
            }
            onChange={
              handleChange
            }
          />

          <button
            type="submit"
            className="primary-button"
          >
            {editingId
              ? 'Update Income'
              : 'Add Income'}
          </button>
        </form>

        {/* TAX OPTIONS */}
        <div className="tax-options">
          <label>
            <input
              type="checkbox"
              name="calculateTax"
              checked={
                form.calculateTax
              }
              onChange={
                handleChange
              }
            />
            Income Tax
          </label>

          <label>
            <input
              type="checkbox"
              name="includeMedicare"
              checked={
                form.includeMedicare
              }
              onChange={
                handleChange
              }
            />
            Medicare Levy
          </label>

          <label>
            <input
              type="checkbox"
              name="hasHecs"
              checked={
                form.hasHecs
              }
              onChange={
                handleChange
              }
            />
            HECS / HELP
          </label>
        </div>

        {/* LIVE PREVIEW */}
        <div className="tax-preview">
          <div>
            <span>
              Gross Annual
            </span>

            <strong>
              {formatCurrency(
                taxPreview.grossAnnual
              )}
            </strong>
          </div>

          <div>
            <span>
              Income Tax
            </span>

            <strong>
              -
              {formatCurrency(
                taxPreview.taxAnnual
              )}
            </strong>
          </div>

          <div>
            <span>
              Medicare
            </span>

            <strong>
              -
              {formatCurrency(
                taxPreview.medicareAnnual
              )}
            </strong>
          </div>

          <div>
            <span>HECS</span>

            <strong>
              -
              {formatCurrency(
                taxPreview.hecsAnnual
              )}
            </strong>
          </div>

          <div className="net-pay">
            <span>
              Net Annual
            </span>

            <strong>
              {formatCurrency(
                taxPreview.netAnnual
              )}
            </strong>
          </div>
        </div>
      </div>

      {/* INCOME LIST */}
      <div
        className="card"
        style={{
          marginTop: '1.5rem',
        }}
      >
        <div className="card-header">
          <h2>
            Your Income
          </h2>
        </div>

        {incomes.length ===
        0 ? (
          <p className="page-subtitle">
            No income added yet.
          </p>
        ) : (
          <div className="account-list">
            {incomes.map(
              (
                income
              ) => {
                const net =
                  calculateNetIncome(
                    income
                  );

                return (
                  <div
                    key={
                      income.id
                    }
                    className="account-row"
                  >
                    <div>
                      <p className="account-name">
                        {
                          income.name
                        }
                      </p>

                      <p className="account-balance">
                        Gross:{' '}
                        {formatCurrency(
                          income.amount
                        )}
                        {' • '}
                        {
                          income.frequency
                        }
                      </p>

                      <p className="page-subtitle">
                        Net Monthly:{' '}
                        {formatCurrency(
                          net.netAnnual /
                            12
                        )}
                      </p>

                      <p className="page-subtitle">
                        Next Pay:{' '}
                        {formatDate(
                          income.nextPayDate
                        )}
                      </p>
                    </div>

                    <div className="account-actions">
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() =>
                          handleEdit(
                            income
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="danger-button"
                        onClick={() =>
                          deleteIncome(
                            income.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Income;