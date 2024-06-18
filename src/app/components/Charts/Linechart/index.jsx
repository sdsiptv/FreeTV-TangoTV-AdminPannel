import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  {
    name: 'JAN',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'FEB',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'MAR',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'APIRL',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'JUNE',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'JULY',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'AUGUST',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const LineGraph = () => {
  return (
    <LineChart
      width={1200}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 10,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#00C49F"
        activeDot={{ r: 8 }}
        strokeWidth=" 10"
      />
      <Line type="monotone" dataKey="uv" stroke="#0088FE" strokeWidth=" 10" />
    </LineChart>
  );
};

export default LineGraph;
