import { Chart, Plugin } from "chart.js";
import { useContext, useMemo } from "react";
import {
  renderTooltip,
  renderTooltipContent,
} from "../../utils";
import { IPropsChart } from "../../type";
import { Context } from "../useContextChart";
import { handleBaseDrawPlugin } from "../../utils/plugin-base";

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
        const idChart = chartContext?.idChart || "";
        if (!idChart) return;
        const containerOfTooltip = document.getElementById(idChart) as HTMLDivElement;
        dataExpense.forEach((_, index) => {
          const imgCategory = chartContext?.data[index].category || [];
          const {x, y} = handleBaseDrawPlugin({activeIndex: index, chart, containerTooltip: containerOfTooltip, idChart, imgCategory, forceCenter: true})
          customContent(
            x,
            y,
            String(index),
            imgCategory,
            idChart,
            containerOfTooltip
          );
        });
      }
    };
  }, [chartContext]);
  return { drawAllToolTip };
};

export default useDrawAllTooltip;
