import { useMemo, useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

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
    frequency: 'monthly',
    category: 'need',
    accountId: '',
  };

  const [form, setForm] =
    useState(emptyForm);

  const [editingId, setEditingId] =
    useState(null);

  const [
    selectedExpense,
    setSelectedExpense,
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

  // ======================================
  // RECURRING EVENTS
  // ======================================

  const calendarEvents =
    useMemo(() => {
      const events = [];

      expenses.forEach(
        (expense) => {
          const start =
            new Date(
              expense.dueDate
            );

          const end =
            new Date();

          end.setFullYear(
            end.getFullYear() +
              2
          );

          let current =
            new Date(
              start
            );

          while (
            current <= end
          ) {
            events.push({
              id: `${expense.id}-${current.toISOString()}`,
              title: `${expense.name} $${expense.amount}`,
              date:
                current
                  .toISOString()
                  .split(
                    'T'
                  )[0],
              extendedProps:
                expense,
              backgroundColor:
                expense.category ===
                'need'
                  ? '#f59e0b'
                  : expense.category ===
                    'want'
                  ? '#3b82f6'
                  : '#22c55e',
            });

            switch (
              expense.frequency
            ) {
              case 'weekly':
                current.setDate(
                  current.getDate() +
                    7
                );
                break;

              case 'fortnightly':
                current.setDate(
                  current.getDate() +
                    14
                );
                break;

              case 'monthly':
                current.setMonth(
                  current.getMonth() +
                    1
                );
                break;

              case 'yearly':
                current.setFullYear(
                  current.getFullYear() +
                    1
                );
                break;

              default:
                current =
                  new Date(
                    end
                  );
            }
          }
        }
      );

      return events;
    }, [expenses]);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">
          Expense Planner
        </h1>

        <p className="page-subtitle">
          Manage bills,
          subscriptions and
          recurring expenses.
        </p>
      </div>

      {/* FORM */}
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
              ? 'Update'
              : 'Add'}
          </button>
        </form>
      </div>

      {/* CALENDAR */}
      <div
        className="card"
        style={{
          marginTop: '1.5rem',
        }}
      >
        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin,
          ]}
          initialView="dayGridMonth"
          height="auto"
          editable
          events={
            calendarEvents
          }
          eventClick={(
            info
          ) =>
            setSelectedExpense(
              info.event
                .extendedProps
            )
          }
        />
      </div>

      {/* DETAILS */}
      {selectedExpense && (
        <div
          className="card"
          style={{
            marginTop:
              '1.5rem',
          }}
        >
          <h2>
            Selected Bill
          </h2>

          <p>
            <strong>
              Name:
            </strong>{' '}
            {
              selectedExpense.name
            }
          </p>

          <p>
            <strong>
              Amount:
            </strong>{' '}
            $
            {
              selectedExpense.amount
            }
          </p>

          <p>
            <strong>
              Frequency:
            </strong>{' '}
            {
              selectedExpense.frequency
            }
          </p>

          <p>
            <strong>
              Account:
            </strong>{' '}
            {getAccountName(
              selectedExpense.accountId
            )}
          </p>

          <div
            className="account-actions"
            style={{
              marginTop:
                '1rem',
            }}
          >
            <button
              className="primary-button"
              onClick={() =>
                handleEdit(
                  selectedExpense
                )
              }
            >
              Edit
            </button>

            <button
              className="danger-button"
              onClick={() => {
                deleteExpense(
                  selectedExpense.id
                );
                setSelectedExpense(
                  null
                );
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Expenses;