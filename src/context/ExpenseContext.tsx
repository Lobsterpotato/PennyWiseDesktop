
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Expense, ExpenseCategory, ExpenseFilters } from "@/types";
import { dummyExpenses } from "@/data/dummy-data";
import { filterExpenses } from "@/lib/expense-utils";
import { useToast } from "@/hooks/use-toast";

interface ExpenseContextType {
  expenses: Expense[];
  filteredExpenses: Expense[];
  filters: ExpenseFilters;
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  setFilters: (filters: ExpenseFilters) => void;
  clearFilters: () => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>(dummyExpenses);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(dummyExpenses);
  const [filters, setFilters] = useState<ExpenseFilters>({});
  const { toast } = useToast();

  // Generate a unique ID
  const generateId = (): string => {
    return `exp-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  // Filter expenses whenever filters or expenses change
  useEffect(() => {
    setFilteredExpenses(filterExpenses(expenses, filters));
  }, [expenses, filters]);

  // Add a new expense
  const addExpense = (expenseData: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expenseData,
      id: generateId(),
    };

    setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
    
    toast({
      title: "Expense Added",
      description: `$${expenseData.amount} for ${expenseData.description}`
    });
  };

  // Update an existing expense
  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(prevExpenses =>
      prevExpenses.map(expense =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    
    toast({
      title: "Expense Updated",
      description: `Updated ${updatedExpense.description}`
    });
  };

  // Delete an expense
  const deleteExpense = (id: string) => {
    const expenseToDelete = expenses.find(expense => expense.id === id);
    
    setExpenses(prevExpenses =>
      prevExpenses.filter(expense => expense.id !== id)
    );
    
    toast({
      title: "Expense Deleted",
      description: expenseToDelete 
        ? `Removed ${expenseToDelete.description}`
        : "Expense removed"
    });
  };

  // Update filters
  const updateFilters = (newFilters: ExpenseFilters) => {
    setFilters(newFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({});
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        filteredExpenses,
        filters,
        addExpense,
        updateExpense,
        deleteExpense,
        setFilters: updateFilters,
        clearFilters
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};
