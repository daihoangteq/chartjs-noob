import "./App.css";
import { Center } from "./components/Center";
import { LeftChart } from "./components/FinancialChart";

function App() {
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
