import "chart.js/auto"; // ADD THIS
import "./App.css";
import Chart from "./components/Chart";

function App() {
  return (
    <div className=" w-full max-w-[393px] h-[396px] mx-auto flex flex-col items-center bg-white">
      <Chart plugins={["drawAllToolTip"]} />
    </div>
  );
}

export default App;
