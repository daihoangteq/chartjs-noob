import { Chart } from "chart.js";
import { calculatePositionOfTooltip } from ".";
import { FinancialData } from "../type";

export const handleBaseDrawPlugin = (props: {
  chart: Chart;
  idChart: string;
  activeIndex: number;
  imgCategory: FinancialData["category"];
  containerTooltip: HTMLDivElement;
  forceCenter?: boolean,
}) => {
  const { chart, activeIndex, imgCategory, containerTooltip, forceCenter } = props;
  const { data: dataAsset } = chart.getDatasetMeta(0);
  const { data: dataExpense } = chart.getDatasetMeta(1);
  const { data: dataIncome } = chart.getDatasetMeta(2);
  const expenseY = dataExpense[activeIndex].y;
  const incomeY = dataIncome[activeIndex].y;
  const y = Math.min(expenseY, incomeY);
  const yMax = Math.max(expenseY, incomeY);
  const yAsset = dataAsset[activeIndex]?.y || y;
  const x = (dataExpense[activeIndex].x + dataIncome[activeIndex].x) / 2;
  const positionOfTooltip = calculatePositionOfTooltip({
    baseX: x,
    baseY: { y, yAsset, yMax },
    numberOfImg: imgCategory.length,
    sizeOfContainer: { width: containerTooltip.clientWidth, height: containerTooltip.clientHeight },
    forceCenter
  });
  return {...positionOfTooltip};
};
