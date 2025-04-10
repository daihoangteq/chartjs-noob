import React, { useRef } from "react";
import { Chart } from "chart.js";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import useRoundedLabels from "./hook/useRoundedLabels";
import useSetupChart from "./hook/useSetupChart";

export const LeftChart: React.FC = () => {
  const { roundedLabelsPlugin } = useRoundedLabels("left");
  const { chartData, options } = useSetupChart("left");
  const chartRef = useRef<Chart<"bar", number[], string> | null>(null);
  return (
    <div className="w-full h-full" id="leftChart">
      <Bar
        ref={chartRef}
        data={chartData}
        options={options}
        plugins={[roundedLabelsPlugin]}
      />
    </div>
  );
};
