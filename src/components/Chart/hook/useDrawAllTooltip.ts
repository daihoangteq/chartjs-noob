import { Chart, Plugin } from "chart.js";
import { useCallback, useContext, useMemo } from "react";
import { Context } from "./useContextChart";
import { imgPath } from "../../../utils";

const customContent = (
  x: number,
  y: number,
  key: string,
  imgCategory: string[]
) => {
  const tooltipEl = document.getElementById("centerChart");
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
      `.key-label-${key}`
    ) as HTMLDivElement;
    if (tooltipEl) {
      if (currentLabel) {
        currentLabel.style.left = x + "px";
        currentLabel.style.top = y + "px";
        return;
      }
      const newItem = document.createElement("div");
      newItem.innerHTML = tableBody;
      newItem.style.position = "absolute";
      newItem.style.zIndex = "1";
      newItem.style.left = x + "px";
      newItem.style.top = y + "px";
      newItem.style.pointerEvents = "none";
      newItem.classList.add(`key-label-${key}`);
      newItem.style.transform = "translate(-50%, -100%)";
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
        console.log(dataIncome);
        dataExpense.forEach((_, index) => {
          console.log(index);
          const y = Math.min(dataExpense[index].y, dataIncome[index].y);
          const x = (dataExpense[index].x + dataIncome[index].x) / 2;
          const imgCategory = chartContext?.data[index].category || [];
          customContent(x, y - 15, `${index}`, imgCategory);
        });
      },
    }
  }, [chartContext])
  return { drawAllToolTip };
};

export default useDrawAllTooltip;
