
import { ExpenseProvider } from "@/context/ExpenseContext";
import Layout from "@/components/Layout";
import ExpenseForm from "@/components/ExpenseForm";
import { useNavigate } from "react-router-dom";

export default function AddExpensePage() {
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    navigate("/");
  };

  return (
    <ExpenseProvider>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add Expense</h1>
            <p className="text-muted-foreground mt-1">
              Create a new expense record
            </p>
          </div>

          <div className="max-w-2xl">
            <ExpenseForm onSuccess={handleSuccess} />
          </div>
        </div>
      </Layout>
    </ExpenseProvider>
  );
}
