import { Chart, Plugin } from "chart.js";
import { useContext, useMemo } from "react";
import { Context } from "./useContextChart";
import { IPropsChart } from "../type";
import { renderTooltip, renderTooltipContent } from "../utils";

const customContent = (
  x: number,
  y: number,
  key: string,
  imgCategory: string[],
  idChart: IPropsChart["idChart"]
) => {
  if (!idChart || !Array.isArray(imgCategory) || imgCategory.length === 0)
    return;
  const tooltipEl = document.getElementById(`${idChart}`);
  if (tooltipEl) {
    const tableBody = renderTooltipContent(imgCategory);
    const currentLabel = (tooltipEl as HTMLDivElement).querySelector(
      `.key-label-${key}`
    ) as HTMLDivElement;
    if (tooltipEl) {
      if (currentLabel) {
        currentLabel.style.left = x + "px";
        currentLabel.style.top = y + "px";
        return;
      }
      const newItem = renderTooltip(tableBody, x, y);
      newItem.classList.add(`key-label-${key}`);
      tooltipEl.appendChild(newItem);
    }
  }
};

const useDrawAllTooltip = () => {
  const chartContext = useContext(Context);
  const drawAllToolTip = useMemo((): Plugin => {
    return {
      id: "drawAllToolTip",
      afterDatasetDraw: (chart: Chart) => {
        const { data: dataExpense } = chart.getDatasetMeta(1);
        const { data: dataIncome } = chart.getDatasetMeta(2);
        dataExpense.forEach((_, index) => {
          const y = Math.min(dataExpense[index].y, dataIncome[index].y);
          const x = (dataExpense[index].x + dataIncome[index].x) / 2;
          const imgCategory = chartContext?.data[index].category || [];
          customContent(
            x,
            y - 15,
            `${index}`,
            imgCategory,
            chartContext?.idChart || ""
          );
        });
      },
    };
  }, [chartContext]);
  return { drawAllToolTip };
};

export default useDrawAllTooltip;
