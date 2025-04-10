import { useMemo } from "react";
import { FinancialData } from "../../Left";

interface IUseCalculateChartWidthArgs {
  barThickness: number;
  barsPerGroup: number;
  barGroupSpacing: number;
  data: FinancialData[];
}
const useCalculateChartWidth = (props: IUseCalculateChartWidthArgs) => {
  const totalWidth = useMemo(() => {
    const numberOfDataPoints = props.data.length;
    if (numberOfDataPoints < 5) return "100%";
    const barThickness = props.barThickness;
    const barsPerGroup = props.barsPerGroup;
    const barGroupSpacing = props.barGroupSpacing;
    const totalWidth =
      (barThickness * barsPerGroup + 2) * numberOfDataPoints +
      barGroupSpacing * (numberOfDataPoints - 1);
    return totalWidth + "px";
  }, [props]);
  return totalWidth;
};

export default useCalculateChartWidth;
