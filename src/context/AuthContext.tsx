
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Define user type
type User = {
  id: string;
  email: string;
  name: string;
  role?: string;
};

// Define auth context shape
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data storage (this would connect to Supabase in a real implementation)
const STORAGE_KEY = "expense_tracker_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This is a mock implementation - would call Supabase in real app
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simple validation (in real app, this would be server-side)
      if (email === "demo@example.com" && password === "password") {
        const newUser = { id: "user-1", email, name: "Demo User", role: "user" };
        setUser(newUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
        toast({
          title: "Login successful",
          description: `Welcome back, ${newUser.name}!`,
        });
        navigate("/");
      } else if (email === "admin@example.com" && password === "admin") {
        const adminUser = { id: "admin-1", email, name: "Admin User", role: "admin" };
        setUser(adminUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
        toast({
          title: "Admin login successful",
          description: `Welcome back, ${adminUser.name}!`,
        });
        navigate("/");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Try demo@example.com / password or admin@example.com / admin",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // This is a mock implementation - would call Supabase in real app
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, this would create a user in the database
      const newUser = { id: `user-${Date.now()}`, email, name, role: "user" };
      setUser(newUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      
      toast({
        title: "Account created",
        description: `Welcome to ExpenseTracker, ${name}!`,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Signup error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  // Provide the authentication context to components
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
