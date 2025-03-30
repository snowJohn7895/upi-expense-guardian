
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from './ui/card';

// Mock data - would be replaced with actual API data
const data = [
  { name: 'Jan', expense: 4000, income: 7000 },
  { name: 'Feb', expense: 3000, income: 7500 },
  { name: 'Mar', expense: 5000, income: 8000 },
  { name: 'Apr', expense: 2780, income: 7800 },
  { name: 'May', expense: 4890, income: 8200 },
  { name: 'Jun', expense: 3390, income: 7800 },
  { name: 'Jul', expense: 4490, income: 8700 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className="p-2 shadow-md border text-sm">
        <CardContent className="p-2">
          <p className="font-semibold">{label}</p>
          <p className="text-red-500">
            Expense: ₹{payload[0].value}
          </p>
          <p className="text-emerald-500">
            Income: ₹{payload[1].value}
          </p>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export const DashboardChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="name"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="expense"
          stackId="1"
          stroke="#EF4444"
          fill="#FEE2E2"
        />
        <Area
          type="monotone"
          dataKey="income"
          stackId="2"
          stroke="#10B981"
          fill="#D1FAE5"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
