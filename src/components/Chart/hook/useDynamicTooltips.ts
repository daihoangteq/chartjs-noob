import { Chart, Plugin } from "chart.js";
import React, { useContext, useMemo } from "react";
import { Context } from "./useContextChart";
import { IPropsChart } from "../type";
import { renderTooltip, renderTooltipContent } from "../utils";

const customContent = (props: {
  x: number;
  y: number;
  key: string;
  imgCategory: string[];
  idChart: IPropsChart["idChart"];
  containerTooltip: HTMLDivElement;
  isRendered: boolean;
}) => {
  const { idChart, imgCategory, x, y, key, containerTooltip, isRendered } =
    props;
  if (!idChart || !Array.isArray(imgCategory) || imgCategory.length === 0)
    return;
  if (!containerTooltip) return;
  if (isRendered) {
    const tableBody = renderTooltipContent(imgCategory);
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
      afterDatasetDraw: (chart: Chart) => {
        const { data: dataExpense } = chart.getDatasetMeta(1);
        const { data: dataIncome } = chart.getDatasetMeta(2);
        const currentActive = dataIncome.findIndex((item) => item.active);
        let currentContainerTooltip = document.getElementById(
          `containerTooltip-${chartContext?.idChart}`
        ) as HTMLDivElement;
        const containerCenterChart = document.getElementById(
          `${chartContext?.idChart}`
        ) as HTMLDivElement;
        if (!containerCenterChart) return;
        const isRendered = Boolean(
          containerCenterChart.getAttribute("tooltip-rendered")
        );
        if (currentActive < 0 && !isRendered) {
          if (!currentContainerTooltip) {
            const containerTooltip = document.createElement("div");
            containerTooltip.setAttribute(
              "id",
              `containerTooltip-${chartContext?.idChart}`
            );
            currentContainerTooltip = containerTooltip;
            containerCenterChart.appendChild(containerTooltip);
          }
          dataExpense.forEach((_, index) => {
            const y = Math.min(dataExpense[index].y, dataIncome[index].y);
            const x = (dataExpense[index].x + dataIncome[index].x) / 2;
            const imgCategory = chartContext?.data[index].category || [];
            customContent({
              x,
              y: y - 15,
              key: `${index}`,
              idChart: chartContext?.idChart || "",
              containerTooltip: currentContainerTooltip,
              imgCategory: imgCategory,
              isRendered: isRendered,
            });
          });
          return;
        }
        if (currentActive >= 0) {
          containerCenterChart.setAttribute("tooltip-rendered", "true");
          currentContainerTooltip.innerHTML = "";
          const y = Math.min(
            dataExpense[currentActive].y,
            dataIncome[currentActive].y
          );
          const x =
            (dataExpense[currentActive].x + dataIncome[currentActive].x) / 2;
          const imgCategory = chartContext?.data[currentActive].category || [];
          customContent({
            x,
            y: y - 15,
            key: `${currentActive}`,
            idChart: chartContext?.idChart || "",
            containerTooltip: containerCenterChart,
            imgCategory: imgCategory,
            isRendered: true,
          });
        }
      },
    };
  }, [chartContext]);
  return { dynamicDrawTooltip };
};

export default useDynamicTooltips;
