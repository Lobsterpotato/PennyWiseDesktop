
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Budget, ExpenseCategory } from "@/types";
import { useToast } from "@/hooks/use-toast";

// Add mock budgets for demonstration
const initialBudgets: Budget[] = [
  {
    id: "budget-1",
    category: "food",
    amount: 500,
    month: new Date().toISOString().slice(0, 7) // Current month
  },
  {
    id: "budget-2",
    category: "transportation",
    amount: 300,
    month: new Date().toISOString().slice(0, 7)
  },
  {
    id: "budget-3",
    category: "entertainment",
    amount: 200,
    month: new Date().toISOString().slice(0, 7)
  },
  {
    id: "budget-4",
    category: "shopping",
    amount: 400,
    month: new Date().toISOString().slice(0, 7)
  },
  {
    id: "budget-5",
    category: "utilities",
    amount: 250,
    month: new Date().toISOString().slice(0, 7)
  }
];

interface BudgetContextType {
  budgets: Budget[];
  addBudget: (budget: Omit<Budget, "id">) => void;
  updateBudget: (budget: Budget) => void;
  deleteBudget: (id: string) => void;
  getBudgetForCategoryAndMonth: (category: ExpenseCategory, month: string) => Budget | undefined;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const { toast } = useToast();

  const generateId = (): string => {
    return `budget-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const addBudget = (budgetData: Omit<Budget, "id">) => {
    const existingBudget = budgets.find(
      b => b.category === budgetData.category && b.month === budgetData.month
    );

    if (existingBudget) {
      updateBudget({ ...existingBudget, amount: budgetData.amount });
      return;
    }

    const newBudget: Budget = {
      ...budgetData,
      id: generateId(),
    };

    setBudgets(prev => [...prev, newBudget]);
    
    toast({
      title: "Budget Set",
      description: `Budget set for ${budgetData.category} - ${formatCurrency(budgetData.amount)}`
    });
  };

  const updateBudget = (updatedBudget: Budget) => {
    setBudgets(prev =>
      prev.map(budget =>
        budget.id === updatedBudget.id ? updatedBudget : budget
      )
    );
    
    toast({
      title: "Budget Updated",
      description: `Updated budget for ${updatedBudget.category}`
    });
  };

  const deleteBudget = (id: string) => {
    const budgetToDelete = budgets.find(budget => budget.id === id);
    
    setBudgets(prev =>
      prev.filter(budget => budget.id !== id)
    );
    
    toast({
      title: "Budget Removed",
      description: budgetToDelete 
        ? `Removed budget for ${budgetToDelete.category}`
        : "Budget removed"
    });
  };

  const getBudgetForCategoryAndMonth = (category: ExpenseCategory, month: string) => {
    return budgets.find(
      budget => budget.category === category && budget.month === month
    );
  };

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        addBudget,
        updateBudget,
        deleteBudget,
        getBudgetForCategoryAndMonth
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudgets = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudgets must be used within a BudgetProvider");
  }
  return context;
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};
