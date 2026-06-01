import { useState } from "react";

export default function useAccounts() {
  const [accounts, setAccounts] = useState([]);

  /**
   * Add new account
   */
  const addAccount = (account) => {
    setAccounts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...account,
      },
    ]);
  };

  /**
   * Remove account
   */
  const removeAccount = (id) => {
    setAccounts((prev) =>
      prev.filter((account) => account.id !== id)
    );
  };

  /**
   * Update account
   */
  const updateAccount = (id, updatedData) => {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === id
          ? { ...account, ...updatedData }
          : account
      )
    );
  };

  return {
    accounts,
    addAccount,
    removeAccount,
    updateAccount,
  };
}