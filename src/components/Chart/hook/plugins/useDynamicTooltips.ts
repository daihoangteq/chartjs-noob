import { Chart, Plugin } from "chart.js";
import React, { useContext, useMemo } from "react";
import { ALIGNMENT_OF_TOOLTIP, IPropsChart } from "../../type";
import { renderTooltip, renderTooltipContent } from "../../utils";
import { Context } from "../useContextChart";
import { handleBaseDrawPlugin } from "../../utils/plugin-base";



const customContent = (props: {
  x: number;
  y: number;
  key: string;
  imgCategory: string[];
  idChart: IPropsChart["idChart"];
  containerTooltip: HTMLDivElement;
  isRendered: boolean;
  alignment: ALIGNMENT_OF_TOOLTIP;
}) => {
  const {
    idChart,
    imgCategory,
    x,
    y,
    key,
    containerTooltip,
    isRendered,
    alignment,
  } = props;
  if (!idChart || !Array.isArray(imgCategory) || imgCategory.length === 0)
    return;
  if (!containerTooltip) return;
  if (isRendered) {
    const tableBody = renderTooltipContent(imgCategory, alignment);
    const currentLabel = (containerTooltip as HTMLDivElement).querySelector(
      `.dynamic-tooltip-label-${idChart}`
    ) as HTMLDivElement;
    if (currentLabel) {
      currentLabel.style.left = x + "px";
      currentLabel.style.top = y + "px";
      currentLabel.innerHTML = tableBody;
      return;
    }
    const newItem = renderTooltip(tableBody, x, y);
    newItem.classList.add(`dynamic-tooltip-label-${idChart}`);
    containerTooltip.appendChild(newItem);
    return;
  }
  if (containerTooltip) {
    const tableBody = renderTooltipContent(imgCategory);
    const currentLabel = (containerTooltip as HTMLDivElement).querySelector(
      `.key-label-${key}`
    ) as HTMLDivElement;
    if (containerTooltip) {
      if (currentLabel) {
        currentLabel.style.left = x + "px";
        currentLabel.style.top = y + "px";
        return;
      }
      const newItem = renderTooltip(tableBody, x, y);
      newItem.classList.add(`key-label-${key}`);
      containerTooltip.appendChild(newItem);
    }
  }
};
const useDynamicTooltips = () => {
  const chartContext = useContext(Context);
  const dynamicDrawTooltip = useMemo((): Plugin => {
    return {
      id: "dynamicTooltip",
      afterDatasetDraw:(chart: Chart) => {
        const { data: dataExpense } = chart.getDatasetMeta(1);
        const idChart = chartContext?.idChart || "";
        if (!idChart) return;
      
        const containerCenterChart = document.getElementById(idChart) as HTMLDivElement;
        if (!containerCenterChart) return;
      
        const isRendered = containerCenterChart.getAttribute("tooltip-rendered") === "true";
        const currentActive = dataExpense.findIndex((item) => item.active);
      
        let containerTooltip = document.getElementById(`containerTooltip-${idChart}`) as HTMLDivElement;
        if (!containerTooltip) {
          containerTooltip = document.createElement("div");
          containerTooltip.id = `containerTooltip-${idChart}`;
          containerCenterChart.appendChild(containerTooltip);
        }
      
        if (currentActive < 0 && !isRendered) {
          dataExpense.forEach((_, index) => {
            const imgCategory = chartContext?.data[index].category || [];
            const positionOfTooltip = handleBaseDrawPlugin({
              chart,
              activeIndex: index,
              containerTooltip: containerCenterChart,
              idChart,
              imgCategory,
              forceCenter: true,
            });
            customContent({
              x: positionOfTooltip.x,
              y: positionOfTooltip.y,
              key: String(index),
              idChart,
              containerTooltip,
              imgCategory,
              isRendered,
              alignment: positionOfTooltip.alignment,
            });
          });
          containerCenterChart.setAttribute("tooltip-rendered", "true");
        } else if (currentActive >= 0) {
          containerTooltip.innerHTML = "";
          const imgCategory = chartContext?.data[currentActive].category || [];
          const positionOfTooltip = handleBaseDrawPlugin({
            chart,
            activeIndex: currentActive,
            containerTooltip: containerCenterChart,
            idChart,
            imgCategory,
          });
          customContent({
            x: positionOfTooltip.x,
            y: positionOfTooltip.y,
            key: String(currentActive),
            idChart,
            containerTooltip,
            imgCategory,
            isRendered: true,
            alignment: positionOfTooltip.alignment,
          });
        }
      }
    };
  }, [chartContext]);
  return { dynamicDrawTooltip };
};

export default useDynamicTooltips;
