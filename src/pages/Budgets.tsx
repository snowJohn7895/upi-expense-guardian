
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Plus, Pencil, Trash2 } from 'lucide-react';

// Mock budget data
const mockBudgets = [
  { 
    id: '1',
    category: 'Food',
    amount: 8000,
    spent: 4500,
    color: 'bg-expense-food',
    textColor: 'text-expense-food'
  },
  { 
    id: '2',
    category: 'Transport',
    amount: 4000,
    spent: 3200,
    color: 'bg-expense-transport',
    textColor: 'text-expense-transport'
  },
  { 
    id: '3',
    category: 'Entertainment',
    amount: 3000,
    spent: 2100,
    color: 'bg-expense-entertainment',
    textColor: 'text-expense-entertainment'
  },
  { 
    id: '4',
    category: 'Shopping',
    amount: 5000,
    spent: 3800,
    color: 'bg-expense-shopping',
    textColor: 'text-expense-shopping'
  },
  { 
    id: '5',
    category: 'Utilities',
    amount: 3000,
    spent: 1800,
    color: 'bg-expense-utilities',
    textColor: 'text-expense-utilities'
  },
];

const Budgets = () => {
  const { toast } = useToast();
  const [budgets, setBudgets] = useState(mockBudgets);
  const [selectedBudget, setSelectedBudget] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const totalBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);
  const totalSpent = budgets.reduce((acc, budget) => acc + budget.spent, 0);
  
  const handleAddBudget = () => {
    setSelectedBudget(null);
    setIsEditing(false);
    setDialogOpen(true);
  };
  
  const handleEditBudget = (budget: any) => {
    setSelectedBudget(budget);
    setIsEditing(true);
    setDialogOpen(true);
  };
  
  const handleSaveBudget = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real app, this would save to a database
    toast({
      title: isEditing ? "Budget Updated" : "Budget Created",
      description: isEditing ? "Your budget has been updated successfully." : "Your new budget has been created.",
    });
    
    setDialogOpen(false);
  };
  
  const handleDeleteBudget = () => {
    // In a real app, this would delete from a database
    toast({
      title: "Budget Deleted",
      description: "Your budget has been deleted successfully.",
    });
    
    setDialogOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="font-bold">Budgets</h1>
          <p className="text-muted-foreground">Manage your spending limits and track your progress</p>
        </div>
        <Button onClick={handleAddBudget} className="mt-4 md:mt-0 gap-1">
          <Plus size={16} />
          Add Budget
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Budget Overview</CardTitle>
          <CardDescription>
            Your overall budget status for this month
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Total Budget</span>
              <span className="text-sm">
                ₹{totalSpent} / ₹{totalBudget} ({Math.round((totalSpent / totalBudget) * 100)}%)
              </span>
            </div>
            <Progress value={(totalSpent / totalBudget) * 100} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Remaining Budget</h3>
              <p className="text-3xl font-bold text-emerald-600">
                ₹{totalBudget - totalSpent}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                for the rest of this month
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Daily Budget</h3>
              <p className="text-3xl font-bold text-blue-600">
                ₹{Math.round((totalBudget - totalSpent) / 10)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {10} days remaining
              </p>
            </div>
          </div>
          
          <div className="flex items-center p-3 border rounded-md bg-blue-50 dark:bg-blue-900/20">
            <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
            <p className="text-sm text-muted-foreground">
              You've used {Math.round((totalSpent / totalBudget) * 100)}% of your total budget this month. 
              {totalSpent / totalBudget > 0.8 
                ? " You're close to your budget limit."
                : " You're on track with your budget."}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map(budget => (
          <Card key={budget.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${budget.color}`}></div>
                  {budget.category}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditBudget(budget)}
                  >
                    <Pencil size={16} />
                  </Button>
                </div>
              </div>
              <CardDescription>
                {Math.round((budget.spent / budget.amount) * 100)}% of budget used
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <Progress 
                  value={(budget.spent / budget.amount) * 100} 
                  className={`h-2 ${budget.color}`} 
                />
                <div className="flex justify-between text-sm">
                  <span className={budget.textColor}>₹{budget.spent} spent</span>
                  <span>₹{budget.amount} budgeted</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                ₹{budget.amount - budget.spent} remaining
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Budget' : 'Create New Budget'}
            </DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Update your budget settings below.' 
                : 'Set a monthly budget for a specific category.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveBudget} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue={selectedBudget?.category || ''}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Budget Amount (₹)</Label>
              <Input 
                id="amount" 
                type="number" 
                placeholder="Enter amount" 
                defaultValue={selectedBudget?.amount || ''} 
              />
            </div>
            
            <DialogFooter className="flex justify-between items-center pt-4">
              {isEditing && (
                <Button 
                  type="button" 
                  variant="destructive" 
                  onClick={handleDeleteBudget}
                  className="gap-1"
                >
                  <Trash2 size={16} />
                  Delete
                </Button>
              )}
              <div className="space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? 'Update' : 'Create'} Budget
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Budgets;
