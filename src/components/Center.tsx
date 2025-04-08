import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ChartOptions, ChartData, Plugin } from "chart.js";
import { Bar } from "react-chartjs-2";
import { calculateDualYAxisTicks, sampleData } from "../utils";
import 'chart.js/auto'; // ADD THIS


// Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

interface FinancialData {
  age: number;
  income: number;
  expenses: number;
  assets: number;
}

interface FinancialChartProps {
  data: FinancialData[];
}

type ChartType = "bar" | "line";
export const FinancialChart: React.FC<FinancialChartProps> = ({ data }) => {
  const chartData: ChartData<ChartType> = {
    labels: data.map((item) => item.age.toString()),
    datasets: [
      {
        type: "line" as const,
        label: "金融資産",
        data: data.map((item) => item.assets),
        borderColor: "#8833FF",
        backgroundColor: "#8833FF",
        yAxisID: "y1",
        tension: .4,
        borderCapStyle: "round",
        borderWidth: 5,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
      {
        type: "bar" as const,
        label: "支出",
        data: data.map((item) => item.expenses),
        backgroundColor: "#00C75D",
        yAxisID: "y",
        categoryPercentage: .6,
        borderRadius: 2,
        barPercentage: .8,
        hoverBackgroundColor: "#00C75D",
      },
      {
        type: "bar" as const,
        label: "収入",
        data: data.map((item) => item.income),
        backgroundColor: "#56CCF2",
        yAxisID: "y",
        categoryPercentage: .6,
        borderRadius: 2,
        barPercentage: .8,
        hoverBackgroundColor: "#56CCF2",
      },
    ],
  };

  const options: ChartOptions<ChartType> = {
    responsive: true,
    maintainAspectRatio: false,
    borderColor: "#F7374F",
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 30,
        bottom: 10,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          drawOnChartArea: false,
          offset: false
        },
        ticks: {
          color: "#666",
          font: {
            size: 12,
          },
          padding:5,
        },
      },
      y: {
        beginAtZero: true,
        // type: "linear" as const,
        display: true,
        min: 0,
        max: calculateDualYAxisTicks(
          [
            ...sampleData.map((item) => item.income),
            ...sampleData.map((item) => item.expenses),
          ],
          sampleData.map((item) => item.assets)
        ).leftAxis.max,
        grid: {
          display: true,
          drawTicks: false,
          drawBorder: false,
          color: "#E4E4E4",
          borderDash: [4, 4], // This creates the dotted effect [dash length, gap length]
          tickColor: "transparent", // Hide the tick marks if needed
        },
        ticks: {
          display: false,
          maxTicksLimit: 8,
          color: "#666",
          font: {
            size: 12,
          },
          stepSize: calculateDualYAxisTicks(
            [
              ...sampleData.map((item) => item.income),
              ...sampleData.map((item) => item.expenses),
            ],
            sampleData.map((item) => item.assets)
          ).leftAxis.stepSize,
          padding: 20,
          callback: function (value) {
            return value;
          },
        },
      },
      y1: {
        beginAtZero: true,
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: false,
        },
        min: 0,
        max: calculateDualYAxisTicks(
          [
            ...sampleData.map((item) => item.income),
            ...sampleData.map((item) => item.expenses),
          ],
          sampleData.map((item) => item.assets)
        ).rightAxis.max,
        grid: {
          drawBorder: false,
        },
        ticks: {
            display: false,
          maxTicksLimit: 8,
          backdropColor: "#030303",
          color: "#F7374F",
          font: {
            size: 12,
          },
          stepSize: calculateDualYAxisTicks(
            [
              ...sampleData.map((item) => item.income),
              ...sampleData.map((item) => item.expenses),
            ],
            sampleData.map((item) => item.assets)
          ).rightAxis.stepSize,
          padding: 10,
          callback: function (value) {
            return value;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  };
  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey((key) => key++);
  }, []);
  return (
    <div className="w-full h-full">
      <Bar key={`${key}-centerChart`} data={chartData} options={options} />
    </div>
  );
};

// Example usage
export const Center: React.FC = () => {
  return <FinancialChart data={sampleData} />;
};
