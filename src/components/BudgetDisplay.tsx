
import React, { useState } from "react";
import { useBudgets } from "@/context/BudgetContext";
import { useExpenses } from "@/context/ExpenseContext";
import { Progress } from "@/components/ui/progress";
import { Toggle } from "@/components/ui/toggle";
import { formatCurrency } from "@/lib/expense-utils";
import { Button } from "@/components/ui/button";
import { ToggleLeft, ToggleRight } from "lucide-react";

export default function BudgetDisplay() {
  const { budgets } = useBudgets();
  const { filteredExpenses } = useExpenses();
  const [showPercentages, setShowPercentages] = useState(true);

  // Calculate total expenses per category
  const expensesByCategory = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Get current month in YYYY-MM format
  const currentMonth = new Date().toISOString().slice(0, 7);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Budget Overview</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowPercentages(!showPercentages)}
        >
          {showPercentages ? <ToggleLeft className="h-5 w-5" /> : <ToggleRight className="h-5 w-5" />}
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {budgets
          .filter(budget => budget.month === currentMonth)
          .map(budget => {
            const spent = expensesByCategory[budget.category] || 0;
            const percentage = (spent / budget.amount) * 100;

            return (
              <div key={budget.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="capitalize">{budget.category}</span>
                  {showPercentages ? (
                    <span className="text-sm text-muted-foreground">
                      {percentage.toFixed(1)}% used
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(spent)} of {formatCurrency(budget.amount)}
                    </span>
                  )}
                </div>
                <Progress 
                  value={percentage} 
                  className={percentage > 100 ? "bg-red-200" : ""}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
