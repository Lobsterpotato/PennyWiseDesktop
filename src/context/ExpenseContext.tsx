
// Context provider for expense data management
// This is the core state management for the application
// Technologies used:
// - React Context API for state management
// - useState and useEffect hooks for reactive state updates
// - Custom hooks for accessing context data
// - Shadcn UI toast notifications

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Expense, ExpenseCategory, ExpenseFilters } from "@/types";
import { dummyExpenses } from "@/data/dummy-data";
import { filterExpenses } from "@/lib/expense-utils";
import { useToast } from "@/hooks/use-toast";

// Define the context shape with all available methods and state
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

// Create the context
const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with dummy data for demo purposes
  const [expenses, setExpenses] = useState<Expense[]>(dummyExpenses);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(dummyExpenses);
  const [filters, setFilters] = useState<ExpenseFilters>({});
  const { toast } = useToast();

  // Generate a unique ID for new expenses
  const generateId = (): string => {
    return `exp-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  // Apply filters whenever expenses or filters change
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
    
    // Show success notification
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

  // Provide all the expense data and functions to components
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

// Custom hook to access the expense context
export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};
