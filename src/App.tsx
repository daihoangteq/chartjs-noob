import { useEffect } from "react";
import "./App.css";
import { Center } from "./components/Center";
import { LeftChart } from "./components/FinancialChart";
import { calculateDualYAxisTicks, sampleData } from "./utils";

function App() {
  useEffect(() => {
    calculateDualYAxisTicks(
      [
        ...sampleData.map((item) => item.income),
        ...sampleData.map((item) => item.expenses),
      ],
      sampleData.map((item) => item.assets)
    );
  }, []);
  return (
    <h1 className="h-screen">
      <div className="relative max-w-[800px] mx-auto">
        <div className="w-[150px] absolute z-10">
          <div className="min-w-full">
            <LeftChart />
          </div>
        </div>
        <div className="absolute pl-[50px] size-[600px] overflow-auto">
          <div className="w-[900px]">
            <Center />
          </div>
        </div>
      </div>
    </h1>
  );
}

export default App;
