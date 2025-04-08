import "chart.js/auto"; // ADD THIS
import { useEffect, useState } from "react";
import "./App.css";
import { Center } from "./components/Center";
import { LeftChart } from "./components/Left";
import { RightChart } from "./components/Right";
import { sampleData } from "./utils";

function App() {
  const [leftChartSize, setLeftChartSize] = useState(0);
  const [rightChartSize, setRightChartSize] = useState(0);
  const calculateChartWidth = () => {
    const numberOfDataPoints = sampleData.length; // Number of age points (30, 40, 50, etc)
    const barThickness = 10; // Width of each bar
    const barsPerGroup = 2; // Number of bars per age group (収入 and 支出)
    const barGroupSpacing = 25; // Space between groups of bars

    // Calculate total width
    const totalWidth =
      (barThickness * barsPerGroup + 2) * numberOfDataPoints + // Width of all bars
      barGroupSpacing * (numberOfDataPoints - 1)

    return totalWidth;
  };
  return (
    <div className="h-full w-full max-w-[393px] mx-auto flex flex-col items-center bg-white">
      <div className="relative flex w-full h-[364px] overflow-hidden">
        <div className="absolute z-10 left-0">
          <div className="absolute left-0 bottom-0 top-0 w-[50%] bg-gradient-to-r from-white to-white-transparent z-1"></div>
          <div className="relative z-10 inset-0 w-full h-[364px]">
            <LeftChart data={sampleData} setLeftSize={setLeftChartSize} />
          </div>
        </div>
        <div
          className={`overflow-x-auto overflow-y-hidden mx-auto w-full`}
          style={{
            paddingLeft: `${leftChartSize}px`,
            paddingRight: `${rightChartSize}px`,
          }}
        >
          <div
            className="h-[364px]"
            style={{
              width:`${calculateChartWidth()}px`
            }}
          >
            <Center />
          </div>
        </div>
        <div className="absolute z-10 right-0">
          <div className="absolute right-0 bottom-0 top-0 w-[50%] bg-gradient-to-l from-white to-white-transparent z-1"></div>
          <div className="relative z-10 inset-0 w-full h-[364px]">
            <RightChart data={sampleData} setRightSize={setRightChartSize} />
          </div>
        </div>
      </div>
      {/* <div className="pl-4 pr-[10px] h-[364px] bg-yellow-100">
      <LeftChart/>
      </div> */}
    </div>
  );
}

export default App;
