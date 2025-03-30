
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent } from './ui/card';

// Mock data - would be replaced with actual API data
const data = [
  { name: 'Food', value: 4000, color: '#FF6B6B' },
  { name: 'Transport', value: 3000, color: '#4ECDC4' },
  { name: 'Entertainment', value: 2000, color: '#FFD166' },
  { name: 'Shopping', value: 1500, color: '#6A0572' },
  { name: 'Utilities', value: 2500, color: '#0072B5' },
];

const COLORS = data.map(item => item.color);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className="p-2 shadow-md border text-sm">
        <CardContent className="p-2">
          <p className="font-semibold" style={{ color: payload[0].payload.color }}>
            {payload[0].name}
          </p>
          <p>
            Amount: ₹{payload[0].value}
          </p>
          <p>
            {payload[0].payload.percent.toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
    );
  }

  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium mt-4">
      {
        payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 mr-1 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.value}
          </li>
        ))
      }
    </ul>
  );
};

export const ExpenseSummaryPie = () => {
  // Calculate percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercent = data.map(item => ({
    ...item,
    percent: (item.value / total) * 100
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={dataWithPercent}
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
        >
          {dataWithPercent.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};
