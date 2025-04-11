import "chart.js/auto"; // ADD THIS
import "./App.css";
import Chart from "./components/Chart";

function App() {
  return (
    <div className="w-full h-full flex flex-col ">
      <div className=" w-full max-w-[393px] h-[396px] mx-auto flex flex-col items-center bg-white">
        <Chart idChart="chartNoPlugin" plugins={["drawEachTooltip"]} />
      </div>
      <div className=" w-full max-w-[600px] h-[500px] mx-auto flex flex-col items-center bg-white">
        <Chart plugins={["drawAllToolTip"]} idChart="chartWithPlugin" />
      </div>
    </div>
  );
}

export default App;
