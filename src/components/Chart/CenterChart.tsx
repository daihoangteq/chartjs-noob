import { useContext } from "react";
import { Context } from "./hook/useContextChart";
import useCalculateChartWidth from "./hook/useCalculateChartWidth";
import { Bar } from "react-chartjs-2";
import useSetupChart from "./hook/useSetupChart";
import useDrawAllTooltip from "./hook/useDrawAllTooltip";
import { Plugin } from "chart.js";
import useDrawEachTooltip from "./hook/useDrawEachTooltip";
import useDynamicTooltips from "./hook/useDynamicTooltips";

const CenterChart = () => {
  const { drawAllToolTip } = useDrawAllTooltip();
  const { drawEachTooltip } = useDrawEachTooltip();
  const {dynamicDrawTooltip} = useDynamicTooltips();
  const chartProperty = useContext(Context);
  const { chartData, options } = useSetupChart("center");
  const widthChart = useCalculateChartWidth({
    barGroupSpacing: 25,
    barsPerGroup: 2,
    barThickness: 10,
    data: chartProperty?.data || [],
  });
  const handlePlugin = () => {
    const arrayOfPlugin: Plugin[] = [drawAllToolTip, drawEachTooltip, dynamicDrawTooltip];
    if (!chartProperty || !chartProperty.plugins) return [];
    return arrayOfPlugin.filter((obj) =>
      Object.values(obj).some((value) =>
        chartProperty?.plugins?.includes(value)
      )
    );
  };
  if (!chartProperty || chartProperty.pendingCalculate) return <></>;
  return (
    <div
      className={`overflow-x-auto overflow-y-hidden mx-auto w-full h-full relative`}
      style={{
        paddingLeft: `${chartProperty.leftChartSize}`,
        paddingRight: `${chartProperty.rightChartSize}`,
      }}
    >
      <div
        className="h-full relative min-w-full"
        style={{
          width: `${widthChart}`,
        }}
      >
        <div className="w-full h-full" id={chartProperty.idChart}>
          <Bar data={chartData} options={options} plugins={handlePlugin()} />
        </div>
      </div>
    </div>
  );
};

export default CenterChart;
