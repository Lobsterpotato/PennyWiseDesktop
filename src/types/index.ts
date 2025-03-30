
export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
  category: ExpenseCategory;
};

export type ExpenseCategory = 
  | "food" 
  | "housing" 
  | "transportation" 
  | "utilities" 
  | "entertainment" 
  | "healthcare" 
  | "education" 
  | "shopping" 
  | "personal" 
  | "other";

export type MonthlyTotal = {
  month: string;
  amount: number;
};

export type CategoryTotal = {
  category: ExpenseCategory;
  amount: number;
};

export type ExpenseFilters = {
  startDate?: Date;
  endDate?: Date;
  categories?: ExpenseCategory[];
  minAmount?: number;
  maxAmount?: number;
  searchQuery?: string;
};
