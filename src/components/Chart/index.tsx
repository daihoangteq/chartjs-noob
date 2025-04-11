import CenterChart from "./CenterChart";
import ChartContext from "./ChartContext";
import { LeftChart } from "./LeftChart";
import { RightChart } from "./RightChart";
import { IListOfPLugin, IPropsChart } from "./type";

interface IPropsChartContainer
  extends IListOfPLugin,
    Pick<IPropsChart, "idChart"> {
      
    }
const Chart: React.FC<IPropsChartContainer> = ({ plugins, idChart }) => {
  return (
    <ChartContext pluginChart={plugins} idChart={idChart}>
      <div className="relative flex w-full h-full overflow-hidden">
        <div className="absolute z-10 left-0 h-full">
          <div className="absolute left-0 bottom-0 top-0 w-[50%] bg-gradient-to-r from-white to-white-transparent z-1 h-full"></div>
          <div className="relative z-10 inset-0 w-full h-full">
            <LeftChart />
          </div>
        </div>
        <CenterChart />
        <div className="absolute z-10 right-0 h-full">
          <div className="absolute right-0 bottom-0 top-0 w-[50%] bg-gradient-to-l from-white to-white-transparent z-1 h-full"></div>
          <div className="relative z-10 inset-0 w-full h-full">
            <RightChart />
          </div>
        </div>
      </div>
    </ChartContext>
  );
};

export default Chart;
