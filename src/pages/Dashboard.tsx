
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDown, ArrowUp, TrendingUp, Wallet, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { DashboardChart } from '@/components/DashboardChart';
import { RecentTransactions } from '@/components/RecentTransactions';
import { useToast } from '@/hooks/use-toast';
import { ExpenseSummaryPie } from '@/components/ExpenseSummaryPie';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = React.useState('overview');
  
  // This would come from an actual API in a real app
  const dashboardData = {
    totalSpent: 12475,
    totalIncome: 38250,
    monthlyBudget: 25000,
    savingsGoal: 100000,
    currentSavings: 65000,
    budgetUsed: 48,
    totalTransactions: 36
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="font-bold">UPI Expense Guardian</h1>
          <p className="text-muted-foreground">Track, manage, and optimize your expenses</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button 
            variant="outline"
            onClick={() => navigate('/transactions/add')}
          >
            Add Transaction
          </Button>
          <Button 
            onClick={() => {
              toast({
                title: "Coming Soon",
                description: "Automated UPI sync feature is under development.",
              });
              navigate("/wallets");
            }}
          >
            Sync UPI Wallet
          </Button>
        </div>
      </div>
  
      <Tabs 
        defaultValue="overview" 
        className="w-full"
        value={currentTab}
        onValueChange={setCurrentTab}
      >
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="card-stats">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Spent
                </CardTitle>
                <ArrowDown className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{dashboardData.totalSpent}</div>
                <p className="text-xs text-muted-foreground">
                  For {new Date().toLocaleString('default', { month: 'long' })}
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-stats">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Income
                </CardTitle>
                <ArrowUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{dashboardData.totalIncome}</div>
                <p className="text-xs text-muted-foreground">
                  For {new Date().toLocaleString('default', { month: 'long' })}
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-stats">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Budget
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{dashboardData.monthlyBudget}</div>
                <div className="mt-2 flex items-center space-x-2">
                  <Progress value={dashboardData.budgetUsed} className="h-2" />
                  <span className="text-xs font-medium">{dashboardData.budgetUsed}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Spending Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <DashboardChart />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Expense Summary</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ExpenseSummaryPie />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1"
                onClick={() => navigate('/transactions')}
              >
                View All <ArrowRight size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              <RecentTransactions limit={5} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="budgets" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Monthly Budget</span>
                    <span className="text-sm">{dashboardData.budgetUsed}% used</span>
                  </div>
                  <Progress value={dashboardData.budgetUsed} className="h-2" />
                  <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                    <span>₹{dashboardData.totalSpent} spent</span>
                    <span>₹{dashboardData.monthlyBudget} total</span>
                  </div>
                </div>
                
                <Button onClick={() => navigate('/budgets')} className="w-full">
                  Manage Budgets
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Savings Goal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm">{Math.round((dashboardData.currentSavings / dashboardData.savingsGoal) * 100)}%</span>
                  </div>
                  <Progress value={(dashboardData.currentSavings / dashboardData.savingsGoal) * 100} className="h-2" />
                  <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                    <span>₹{dashboardData.currentSavings}</span>
                    <span>₹{dashboardData.savingsGoal}</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/budgets')} 
                  className="w-full"
                >
                  Update Savings Goal
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Spending Analysis</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <div className="h-full flex items-center justify-center flex-col">
                <ExpenseSummaryPie />
                <Button 
                  className="mt-4" 
                  onClick={() => navigate('/analytics')}
                >
                  View Detailed Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
