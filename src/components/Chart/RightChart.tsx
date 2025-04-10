import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import useRoundedLabels from "./hook/useRoundedLabels";
import useSetupChart from "./hook/useSetupChart";

export interface FinancialData {
  age: number;
  income: number;
  expenses: number;
  assets: number;
}

// Define the custom plugin for rounded labels

export const RightChart: React.FC = () => {
  const { roundedLabelsPlugin } = useRoundedLabels("right");
  const { chartData, options } = useSetupChart("right");
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
