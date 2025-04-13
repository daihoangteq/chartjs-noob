import { Chart, Plugin } from "chart.js";
import { useContext, useMemo } from "react";
import { Context } from "./useContextChart";
import { IPropsChart, ALIGNMENT_OF_TOOLTIP } from "../type";
import {
  calculatePositionOfTooltip,
  renderTooltip,
  renderTooltipContent,
} from "../utils";
import { handleBaseDrawPlugin } from "../utils/plugin-base";

const customContent = (
  x: number,
  y: number,
  imgCategory: string[],
  idChart: IPropsChart["idChart"],
  containerTooltip: HTMLDivElement,
  alignment: ALIGNMENT_OF_TOOLTIP
) => {
  if (!idChart || !Array.isArray(imgCategory) || imgCategory.length === 0)
    return;
  if (containerTooltip) {
    const tableBody = renderTooltipContent(imgCategory, alignment);
    const currentLabel = (containerTooltip as HTMLDivElement).querySelector(
      `.tooltip-label-${idChart}`
    ) as HTMLDivElement;
    if (containerTooltip) {
      if (currentLabel) {
        currentLabel.style.left = x + "px";
        currentLabel.style.top = y + "px";
        currentLabel.innerHTML = tableBody;
        return;
      }
      const newItem = renderTooltip(tableBody, x, y);
      newItem.classList.add(`tooltip-label-${idChart}`);
      containerTooltip.appendChild(newItem);
    }
  }
};

const useDrawEachTooltip = () => {
  const chartContext = useContext(Context);
  const drawEachTooltip = useMemo((): Plugin => {
    return {
      id: "drawEachTooltip",
      afterDatasetDraw: (chart: Chart) => {
        const idChart = chartContext?.idChart;
        if (!idChart) return;
        const { data: dataIncome } = chart.getDatasetMeta(2);
        const tooltipEl = document.getElementById(idChart) as HTMLDivElement;
        const currentActive = dataIncome.findIndex((item) => item.active);
        if (currentActive < 0) return;
        const imgCategory = chartContext?.data[currentActive].category || [];
        const { x, y, alignment } = handleBaseDrawPlugin({
          chart,
          idChart,
          activeIndex: currentActive,
          containerTooltip: tooltipEl,
          imgCategory: imgCategory,
        });
        customContent(x, y, imgCategory, idChart, tooltipEl, alignment);
      },
    };
  }, [chartContext]);
  return { drawEachTooltip };
};

export default useDrawEachTooltip;
