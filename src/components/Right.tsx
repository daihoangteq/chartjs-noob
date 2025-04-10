import React, { useEffect, useState } from "react";
import { ChartOptions, ChartData, Plugin } from "chart.js";
import { Bar } from "react-chartjs-2";
import { calculateDualYAxisTicks, sampleData } from "../utils";
import "chart.js/auto"; // ADD THIS

export interface FinancialData {
  age: number;
  income: number;
  expenses: number;
  assets: number;
}

interface FinancialChartProps {
  data: FinancialData[];
  setRightSize: (size: number) => void;
}

type ChartType = "bar" | "line";
// Define the custom plugin for rounded labels

export const RightChart: React.FC<FinancialChartProps> = ({
  data,
  setRightSize,
}) => {
  const roundedLabelsPlugin: Plugin = {
    id: "roundedLabels",
    beforeDraw(chart) {
      const ctx = chart.ctx;
      const yAxis = chart.scales.y1;

      ctx.font = chart.ctx.font || "12px Inter";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let maxTextWidth = 0;
      const padding = 10;
      yAxis.ticks.forEach((tick, index) => {
        if (index === 0) return;
        const tickLabel = yAxis.getLabelForValue(tick.value);
        // Calculate text width
        const textMetrics = ctx.measureText(tickLabel);
        const textWidth = textMetrics.width + padding * 2;
        if (textWidth > maxTextWidth) {
          maxTextWidth = textWidth;
        }
      });
      const widthOfChart = maxTextWidth + 10;
      chart.canvas.style.width = widthOfChart + "px";
      setRightSize(Math.floor(widthOfChart));
      yAxis.ticks.forEach((tick, index) => {
        if(index === 0) return 
        const tickLabel = yAxis.getLabelForValue(tick.value);
        const textMetrics = ctx.measureText(tickLabel);
        const textWidth = textMetrics.width + padding * 2;
        const labelY = yAxis.getPixelForValue(tick.value);
        const boxHeight = 20;
        // Adjust x position to align left
        const labelX = yAxis.right; // Move left by padding amount
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.02)";
        ctx.shadowBlur = 0.1; // Adjust blur amount
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.fillStyle = "#FFFFFFCC"; // Your background color
        ctx.beginPath();
        ctx.roundRect(
          labelX, // Position rectangle to the left of the axis
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
          labelX + textWidth / 2, // Center text in box
          labelY
        );
        ctx.restore();
      });
    },
  };
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
        left: 0,
        right: 100,
        top: 30,
        bottom: 10,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          drawBorder: false,
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
        beginAtZero: true,
        // type: "linear" as const,
        display: false,
        position: "right" as const,
        title: {
          display: false,
        },
        min: 0,
        max:
          calculateDualYAxisTicks(
            [
              ...sampleData.map((item) => item.income),
              ...sampleData.map((item) => item.expenses),
            ],
            sampleData.map((item) => item.assets)
          ).rightAxis.max,
        grid: {
          display: false,
        },
        ticks: {
          backdropColor: "#030303",
          color: "#F7374F",
          font: {
            size: 12,
          },
          stepSize:
            calculateDualYAxisTicks(
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
      <Bar
        key={`${key}-rightChart`}
        data={chartData}
        options={options}
        plugins={[roundedLabelsPlugin]}
      />
    </div>
  );
};

