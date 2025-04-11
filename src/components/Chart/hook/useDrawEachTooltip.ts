import { Chart, Plugin } from "chart.js";
import { useContext, useMemo } from "react";
import { Context } from "./useContextChart";
import { IPropsChart } from "../type";

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
    const tableBody = `
      <div style="position: relative; border-radius: 20px; background-color: white; filter:drop-shadow(0px 2px 6px #00000040)">
        <div
          style="
            display: flex;
            flex-direction: column;
            position: relative;
            width: 32px;
            gap: 4px;
            padding: 4px;
            border-radius: 20px;
          "
        >
        ${imgCategory
          .map((item) => {
            return `
          <img
              src="${item}"
              style="
                  width: 24px;
                  height: 24px;
                  object-fit: cover;
                  border-radius: 50%;
              "
              alt="icon"
          />
      `;
          })
          .join("")}
        </div>
        <div
          style="
            top: 100%;
            left: 50%;
            transform: translate(-50%, -30%);
            position: absolute;
          "
        >
          <svg
            width="10"
            height="13"
            viewBox="0 0 10 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0L5.94174 11.3631C5.62571 12.248 4.37429 12.248 4.05826 11.3631L0 0H10Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
            `;
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
      const newItem = document.createElement("div");
      newItem.innerHTML = tableBody;
      newItem.style.position = "absolute";
      newItem.style.zIndex = "1";
      newItem.style.left = x + "px";
      newItem.style.top = y + "px";
      newItem.style.pointerEvents = "none";
      newItem.classList.add(`tooltip-label-${idChart}`);
      newItem.style.transform = "translate(-50%, -100%)";
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
