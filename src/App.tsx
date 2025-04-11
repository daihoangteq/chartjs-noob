import "chart.js/auto"; // ADD THIS
import "./App.css";
import Chart from "./components/Chart";

function App() {
  return (
    <div className="w-full h-full flex flex-wrap gap-4">
      <div className=" w-1/2 max-w-[393px] h-[396px] flex flex-col items-center bg-white">
        <Chart idChart="chartNoPlugin" plugins={["drawEachTooltip"]} />
      </div>
      <div className=" w-1/2 max-w-[600px] h-[500px] flex flex-col items-center bg-white">
        <Chart plugins={["drawAllToolTip"]} idChart="chartWithPlugin" />
      </div>
      <div className=" w-1/2 max-w-[600px] h-[500px] flex flex-col items-center bg-white">
        <Chart plugins={["dynamicTooltip"]} idChart="comboPlugin" />
      </div>
      {/* <div className=" w-1/2 max-w-[600px] h-[500px] flex flex-col items-center bg-white">
        <Chart plugins={["drawAllToolTip"]} idChart="comboPlugin" />
      </div> */}
    </div>
  );
}

export default App;
