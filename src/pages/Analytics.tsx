
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ExpenseSummaryPie } from '@/components/ExpenseSummaryPie';

// Mock data for analytics
const monthlyData = [
  { month: 'Jan', expenses: 12000, income: 45000, savings: 33000 },
  { month: 'Feb', expenses: 14000, income: 46000, savings: 32000 },
  { month: 'Mar', expenses: 11000, income: 47000, savings: 36000 },
  { month: 'Apr', expenses: 15000, income: 47000, savings: 32000 },
  { month: 'May', expenses: 13000, income: 48000, savings: 35000 },
  { month: 'Jun', expenses: 16000, income: 49000, savings: 33000 },
];

const categoryData = [
  { name: 'Food', value: 4500, color: '#FF6B6B' },
  { name: 'Transport', value: 3200, color: '#4ECDC4' },
  { name: 'Entertainment', value: 2100, color: '#FFD166' },
  { name: 'Shopping', value: 3800, color: '#6A0572' },
  { name: 'Utilities', value: 1800, color: '#0072B5' },
  { name: 'Health', value: 1200, color: '#FF9F1C' },
  { name: 'Education', value: 900, color: '#2EC4B6' },
  { name: 'Other', value: 1500, color: '#AAAAAA' },
];

const weekdayData = [
  { day: 'Mon', expenses: 1500 },
  { day: 'Tue', expenses: 1200 },
  { day: 'Wed', expenses: 2100 },
  { day: 'Thu', expenses: 1800 },
  { day: 'Fri', expenses: 2500 },
  { day: 'Sat', expenses: 3200 },
  { day: 'Sun', expenses: 1900 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border shadow-md rounded-md">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: ₹{entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('monthly');
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold">Analytics</h1>
        <p className="text-muted-foreground">Visualize your spending patterns and trends</p>
      </div>
      
      <div className="flex justify-end">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 w-full md:w-[600px] mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expense-analysis">Expense Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Income vs Expenses</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₹${value / 1000}K`} />
                  <Tooltip formatter={(value) => [`₹${value}`, '']} />
                  <Legend />
                  <Bar dataKey="income" name="Income" fill="#10B981" />
                  <Bar dataKey="expenses" name="Expenses" fill="#EF4444" />
                  <Bar dataKey="savings" name="Savings" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ExpenseSummaryPie />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Daily Spending Pattern</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weekdayData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={(value) => `₹${value}`} />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Expenses']} />
                    <Bar dataKey="expenses" name="Expenses" fill="#9333EA" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="expense-analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Expense Categories Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Spending Trends Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₹${value / 1000}K`} />
                  <Tooltip formatter={(value) => [`₹${value}`, '']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    name="Expenses" 
                    stroke="#EF4444" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    name="Income" 
                    stroke="#10B981" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-semibold text-lg mb-2">Food Expenses Analysis</h3>
                  <p className="text-muted-foreground">Your food expenses increased by 15% compared to last month. Consider cooking at home more often to reduce costs.</p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-semibold text-lg mb-2">Potential Savings</h3>
                  <p className="text-muted-foreground">Based on your spending pattern, you could save up to ₹5,000 by reducing entertainment expenses.</p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-semibold text-lg mb-2">Budget Alert</h3>
                  <p className="text-muted-foreground">You've used 85% of your shopping budget this month. Be careful with additional expenses in this category.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Smart Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/20">
                  <h3 className="font-semibold text-lg mb-2">Optimize Food Expenses</h3>
                  <p className="text-muted-foreground">Try meal planning and bulk cooking to reduce your food expenses by up to 30%.</p>
                </div>
                
                <div className="p-4 border rounded-md bg-purple-50 dark:bg-purple-900/20">
                  <h3 className="font-semibold text-lg mb-2">Transport Savings</h3>
                  <p className="text-muted-foreground">Consider carpooling or using public transport to save on fuel costs.</p>
                </div>
                
                <div className="p-4 border rounded-md bg-green-50 dark:bg-green-900/20">
                  <h3 className="font-semibold text-lg mb-2">Subscription Review</h3>
                  <p className="text-muted-foreground">You have multiple active subscriptions. Review and cancel unused ones to save ₹1,200 monthly.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
