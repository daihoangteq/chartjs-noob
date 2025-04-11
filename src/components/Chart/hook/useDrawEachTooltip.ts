import { Chart, Plugin } from "chart.js";
import { useContext, useMemo } from "react";
import { Context } from "./useContextChart";
import { IPropsChart } from "../type";
import { renderTooltip, renderTooltipContent } from "../utils";

const customContent = (
  x: number,
  y: number,
  imgCategory: string[],
  idChart: IPropsChart["idChart"]
) => {
  if (!idChart || !Array.isArray(imgCategory) || imgCategory.length === 0)
    return;
  const tooltipEl = document.getElementById(`${idChart}`);
  if (tooltipEl) {
    const tableBody = renderTooltipContent(imgCategory);
    const currentLabel = (tooltipEl as HTMLDivElement).querySelector(
      `.tooltip-label-${idChart}`
    ) as HTMLDivElement;
    if (tooltipEl) {
      if (currentLabel) {
        currentLabel.style.left = x + "px";
        currentLabel.style.top = y + "px";
        currentLabel.innerHTML = tableBody;
        return;
      }
      const newItem = renderTooltip(tableBody, x, y);
      newItem.classList.add(`tooltip-label-${idChart}`);
      tooltipEl.appendChild(newItem);
    }
  }
};

const useDrawEachTooltip = () => {
  const chartContext = useContext(Context);
  const drawEachTooltip = useMemo((): Plugin => {
    return {
      id: "drawEachTooltip",
      afterDatasetDraw: (chart: Chart) => {
        const { data: dataExpense } = chart.getDatasetMeta(1);
        const { data: dataIncome } = chart.getDatasetMeta(2);
        const currentActive = dataIncome.findIndex((item) => item.active);
        if (currentActive < 0) return;
        const y = Math.min(
          dataExpense[currentActive].y,
          dataIncome[currentActive].y
        );
        const x =
          (dataExpense[currentActive].x + dataIncome[currentActive].x) / 2;
        const imgCategory = chartContext?.data[currentActive].category || [];
        // 15 is triangle height
        customContent(x, y - 15, imgCategory, chartContext?.idChart || "");
      },
    };
  }, [chartContext]);
  return { drawEachTooltip };
};

export default useDrawEachTooltip;
