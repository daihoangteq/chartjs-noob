import React from "react";
import { ChartOptions, ChartData, Plugin } from "chart.js";
import { Bar } from "react-chartjs-2";
import { calculateDualYAxisTicks, sampleData } from "../utils";

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

export interface FinancialData {
  age: number;
  income: number;
  expenses: number;
  assets: number;
}

interface FinancialChartProps {
  data: FinancialData[];
}

type ChartType = "bar" | "line";
// Define the custom plugin for rounded labels
const roundedLabelsPlugin: Plugin = {
  id: "roundedLabels",
  beforeDraw(chart) {
    const ctx = chart.ctx;
    const yAxis = chart.scales.y;

    ctx.font = chart.ctx.font || "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    yAxis.ticks.forEach((tick) => {
      const tickLabel = yAxis.getLabelForValue(tick.value);

      // Calculate text width
      const textMetrics = ctx.measureText(tickLabel);
      const padding = 10;
      const textWidth = textMetrics.width + padding * 2;

      const labelY = yAxis.getPixelForValue(tick.value);
      const boxHeight = 20;

      // Adjust x position to align right
      const labelX = yAxis.left - padding; // Move left by padding amount

      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.05)"; // 80% opacity for blur
      ctx.shadowBlur = 0.1; // Adjust blur amount
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle = "#FFFFFFCC"; // Your background color
      ctx.beginPath();
      ctx.roundRect(
        labelX - textWidth, // Position rectangle to the left of the axis
        labelY - boxHeight / 2,
        textWidth,
        boxHeight,
        10
      );
      ctx.fill();

      // Adjust text position
      ctx.fillStyle = "#9747FF"; // Text color
      ctx.fillText(
        tickLabel,
        labelX - textWidth / 2, // Center text in box
        labelY
      );
      ctx.restore();
    });
  },
};

export const FinancialChart: React.FC<FinancialChartProps> = ({ data }) => {
  const chartData: ChartData<ChartType> = {
    labels: data.map((item) => item.age.toString()),
    datasets: [
      {
        type: "line" as const,
        label: "金融資産",
        data: data.map((item) => item.assets),
        borderColor: "rgba(0, 0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        yAxisID: "y1",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        type: "bar" as const,
        label: "収入",
        data: data.map((item) => item.income),
        backgroundColor: "#4CAF50",
        yAxisID: "y",
        borderRadius: 4,
        barThickness: 20,
        hidden: true,
      },
      {
        type: "bar" as const,
        label: "支出",
        data: data.map((item) => item.expenses),
        backgroundColor: "#2196F3",
        yAxisID: "y",
        borderRadius: 4,
        barThickness: 20,
        hidden: true,
      },
    ],
  };

  const options: ChartOptions<ChartType> = {
    responsive: true,
    maintainAspectRatio: false,
    borderColor: "rgba(0,0,0,0)",
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    layout: {
      padding: {
        left: 100,
        right: 0,
        top: 30,
        bottom: 51,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#666",
          font: {
            size: 12,
          },
          padding: 5,
          callback: function () {
            return "";
          },
        },
      },
      y: {
        beginAtZero:true,
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
          display: false,
          drawTicks: false,
          drawBorder: false,
          color: "#E4E4E4",
          borderDash: [4, 4], // This creates the dotted effect [dash length, gap length]
          tickColor: "transparent", // Hide the tick marks if needed
        },
        ticks: {
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
          callback: function () {
            return "";
          },
        },
      },
      y1: {
        beginAtZero:true,
        // type: "linear" as const,
        display: false,
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
        ).rightAxis.max / 2,
        grid: {
          display: false,
        },
        ticks: {
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
          ).rightAxis.stepSize / 2,
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

  return (
    <div className="w-full max-w-[800px] h-[400px] mx-auto relative p-5 bg-transparent rounded-lg">
      <Bar data={chartData} options={options} plugins={[roundedLabelsPlugin]} />
    </div>
  );
};

// Example usage
export const LeftChart: React.FC = () => {
  return <FinancialChart data={sampleData} />;
};
