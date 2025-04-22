
import { ExpenseProvider } from "@/context/ExpenseContext";
import Layout from "@/components/Layout";
import DashboardSummary from "@/components/DashboardSummary";
import ExpenseFilters from "@/components/ExpenseFilters";
import ExpenseList from "@/components/ExpenseList";
import BudgetDisplay from "@/components/BudgetDisplay";

export default function Dashboard() {
  return (
    <ExpenseProvider>
      <Layout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your expenses
            </p>
          </div>

          <DashboardSummary />
          
          <ExpenseFilters />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ExpenseList />
            <BudgetDisplay />
          </div>
        </div>
      </Layout>
    </ExpenseProvider>
  );
}
