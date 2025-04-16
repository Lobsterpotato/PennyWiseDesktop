
// Dashboard/Home page component
// This is the main landing page of the application that displays:
// - Summary metrics and charts
// - Expense list with filtering options
// - Built with React and various components

import { ExpenseProvider } from "@/context/ExpenseContext";
import Layout from "@/components/Layout";
import DashboardSummary from "@/components/DashboardSummary";
import ExpenseFilters from "@/components/ExpenseFilters";
import ExpenseList from "@/components/ExpenseList";

export default function Dashboard() {
  return (
    // ExpenseProvider makes expense data available to all child components
    <ExpenseProvider>
      <Layout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your expenses
            </p>
          </div>

          {/* Dashboard summary with charts and key metrics */}
          <DashboardSummary />
          
          <div>
            {/* Filter controls for expenses */}
            <ExpenseFilters />
            {/* Tabular list of expenses */}
            <ExpenseList />
          </div>
        </div>
      </Layout>
    </ExpenseProvider>
  );
}
