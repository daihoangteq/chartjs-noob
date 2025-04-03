import {
  Chart as ChartJS,
  ChartOptions,
  ChartData,
  ChartDataset,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
const sampleData = [
  { age: 30, income: 500, expenses: 400, assets: 300 },
  { age: 40, income: 800, expenses: 600, assets: 1000 },
  { age: 50, income: 1000, expenses: 700, assets: 2000 },
  { age: 60, income: 900, expenses: 600, assets: 3500 },
  { age: 70, income: 700, expenses: 500, assets: 4500 },
  { age: 80, income: 500, expenses: 400, assets: 5000 },
];
const ChartComponent = () => {
  const dataChart: ChartData = {
    labels: sampleData.map(item => item.age),
    datasets: [    {
        label: 'Dataset 1',
        data: sampleData.map(item => item.expenses),
        borderColor: "#9333EA",
        backgroundColor: "rgba(147, 51, 234, 0.1)",
      },],
  };
  const fixedYOptions: ChartOptions = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 13,
        bottom: 32,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        max: 5,
        min: 0,
        ticks: {
          maxTicksLimit: 5,
          minTicksLimit: 5,
          autoSkip: true,
          font: {
            size: 10,
            weight: 400,
            color: "#646464",
            family: "Noto Sans JP",
          },
          crossAlign: "far",
        },
        grid: {
          drawTicks: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };
  return (
    <div>
      <Bar
        data={dataChart}
        options={fixedYOptions}
      />
    </div>
  );
};

export default ChartComponent;
