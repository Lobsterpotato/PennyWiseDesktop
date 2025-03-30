
import { CategoryTotal, Expense, ExpenseCategory, ExpenseFilters, MonthlyTotal } from "@/types";

// Calculate total expenses
export const calculateTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

// Filter expenses based on criteria
export const filterExpenses = (expenses: Expense[], filters: ExpenseFilters): Expense[] => {
  return expenses.filter(expense => {
    // Filter by date range
    if (filters.startDate && expense.date < filters.startDate) return false;
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      if (expense.date > endDate) return false;
    }

    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(expense.category)) return false;
    }

    // Filter by amount range
    if (filters.minAmount !== undefined && expense.amount < filters.minAmount) return false;
    if (filters.maxAmount !== undefined && expense.amount > filters.maxAmount) return false;

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesDescription = expense.description.toLowerCase().includes(query);
      const matchesCategory = expense.category.toLowerCase().includes(query);
      if (!matchesDescription && !matchesCategory) return false;
    }

    return true;
  });
};

// Get expenses by category
export const getExpensesByCategory = (expenses: Expense[]): CategoryTotal[] => {
  const categoryTotals: Record<ExpenseCategory, number> = {
    food: 0,
    housing: 0,
    transportation: 0,
    utilities: 0,
    entertainment: 0,
    healthcare: 0,
    education: 0,
    shopping: 0,
    personal: 0,
    other: 0
  };

  expenses.forEach(expense => {
    categoryTotals[expense.category] += expense.amount;
  });

  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category: category as ExpenseCategory,
      amount
    }))
    .filter(item => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);
};

// Get monthly totals
export const getMonthlyTotals = (expenses: Expense[]): MonthlyTotal[] => {
  const monthlyData: Record<string, number> = {};

  expenses.forEach(expense => {
    const date = expense.date;
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }
    
    monthlyData[month] += expense.amount;
  });

  return Object.entries(monthlyData)
    .map(([month, amount]) => ({ month, amount }))
    .sort((a, b) => a.month.localeCompare(b.month));
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

// Format date
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Get category color
export const getCategoryColor = (category: ExpenseCategory): string => {
  const colors: Record<ExpenseCategory, string> = {
    food: 'expense-orange',
    housing: 'expense-blue',
    transportation: 'expense-green',
    utilities: 'expense-purple',
    entertainment: 'expense-pink',
    healthcare: 'expense-red',
    education: 'expense-yellow',
    shopping: 'expense-blue',
    personal: 'expense-green',
    other: 'expense-purple'
  };
  
  return colors[category];
};

// Get category icon name
export const getCategoryIcon = (category: ExpenseCategory): string => {
  const icons: Record<ExpenseCategory, string> = {
    food: 'utensils',
    housing: 'home',
    transportation: 'car',
    utilities: 'zap',
    entertainment: 'film',
    healthcare: 'heart',
    education: 'book',
    shopping: 'shopping-bag',
    personal: 'user',
    other: 'box'
  };
  
  return icons[category];
};
