
import { ExpenseProvider } from "@/context/ExpenseContext";
import Layout from "@/components/Layout";
import DashboardSummary from "@/components/DashboardSummary";
import ExpenseFilters from "@/components/ExpenseFilters";
import ExpenseList from "@/components/ExpenseList";
import BudgetForm from "@/components/BudgetForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

          <Card>
            <CardHeader>
              <CardTitle>Set Monthly Budget</CardTitle>
              <CardDescription>Define budget limits for each category</CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetForm />
            </CardContent>
          </Card>

          <DashboardSummary />
          
          <div>
            <ExpenseFilters />
            <ExpenseList />
          </div>
        </div>
      </Layout>
    </ExpenseProvider>
  );
}
