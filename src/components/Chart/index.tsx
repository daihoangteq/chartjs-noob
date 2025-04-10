import CenterChart from "./CenterChart";
import ChartContext from "./ChartContext";
import { LeftChart } from "./LeftChart";
import { RightChart } from "./RightChart";
import { IListOfPLugin } from "./type";

type IPropsChart = IListOfPLugin
const Chart: React.FC<IPropsChart> = ({ plugins }) => {
  return (
    <ChartContext pluginChart={plugins}>
      <div className="relative flex w-full h-full overflow-hidden">
        <div className="absolute z-10 left-0">
          <div className="absolute left-0 bottom-0 top-0 w-[50%] bg-gradient-to-r from-white to-white-transparent z-1"></div>
          <div className="relative z-10 inset-0 w-full h-[396px]">
            <LeftChart />
          </div>
        </div>
        <CenterChart />
        <div className="absolute z-10 right-0">
          <div className="absolute right-0 bottom-0 top-0 w-[50%] bg-gradient-to-l from-white to-white-transparent z-1"></div>
          <div className="relative z-10 inset-0 w-full h-[396px]">
            <RightChart />
          </div>
        </div>
      </div>
    </ChartContext>
  );
};

export default Chart;
