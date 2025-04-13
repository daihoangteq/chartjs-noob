import { Chart, Plugin } from "chart.js";
import { useContext, useMemo } from "react";
import { Context } from "./useContextChart";
import { IPropsChart } from "../type";
import {
  calculatePositionOfTooltip,
  renderTooltip,
  renderTooltipContent,
} from "../utils";

const customContent = (
  x: number,
  y: number,
  key: string,
  imgCategory: string[],
  idChart: IPropsChart["idChart"],
  containerOfTooltip: HTMLDivElement
) => {
  if (!idChart || !Array.isArray(imgCategory) || imgCategory.length === 0)
    return;
  if (containerOfTooltip) {
    const currentLabel = (containerOfTooltip as HTMLDivElement).querySelector(
      `.key-label-${key}`
    ) as HTMLDivElement;
    const tableBody = renderTooltipContent(imgCategory);
    if (containerOfTooltip) {
      if (currentLabel) {
        currentLabel.style.left = x + "px";
        currentLabel.style.top = y + "px";
        return;
      }
      const newItem = renderTooltip(tableBody,x, y);
      newItem.classList.add(`key-label-${key}`);
      containerOfTooltip.appendChild(newItem);
    }
  }
};

const useDrawAllTooltip = () => {
  const chartContext = useContext(Context);
  const drawAllToolTip = useMemo((): Plugin => {
    return {
      id: "drawAllToolTip",
      afterDraw: (chart: Chart) => {
        const { data: dataExpense } = chart.getDatasetMeta(1);
        const { data: dataIncome } = chart.getDatasetMeta(2);
        const { data: dataAsset } = chart.getDatasetMeta(0);
        
        const idChart = chartContext?.idChart || ""
        if(!idChart) return;
        const containerOfTooltip = document.getElementById(`${idChart}`) as HTMLDivElement;
        dataExpense.forEach((_, index) => {
          const y = Math.min(dataExpense[index].y, dataIncome[index].y);
          const yMax = Math.max(dataExpense[index].y, dataIncome[index].y)
          const yAsset = dataAsset[index].y || y;
          
          const x = (dataExpense[index].x + dataIncome[index].x) / 2;
          const imgCategory = chartContext?.data[index].category || [];
          const positionOfTooltip = calculatePositionOfTooltip({
            baseX: x,
            baseY: y,
            numberOfImg: imgCategory.length,
            sizeOfContainer: containerOfTooltip.clientHeight,
            forceCenter: {
              yMax: yMax,
              yAsset: yAsset
            }
          })
          customContent(
            positionOfTooltip.x,
            positionOfTooltip.y,
            `${index}`,
            imgCategory,
            idChart || "",
            containerOfTooltip
          );
        });
      },
    };
  }, [chartContext]);
  return { drawAllToolTip };
};

export default useDrawAllTooltip;
