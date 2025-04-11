import { FinancialData } from "../type";

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function calculateDualYAxisTicks(
  leftAxisData: number[],
  rightAxisData: number[]
) {
  function calculateNiceScale(data: number[]) {
    // Get max value from data
    const maxValue = Math.max(...data.filter((val) => !isNaN(val)));
    const roundUpToNice = (num: number) => {
      const power = Math.floor(Math.log10(num));
      const base = Math.pow(10, power);
      // Adjusted multipliers to handle larger numbers better
      if (num <= base * 2) return base * 2;
      if (num <= base * 5) return base * 5;
      if (num <= base * 10) return base * 10;
      return base * 20;
    };

    let niceMax = roundUpToNice(maxValue);
    // Ensure niceMax is always greater than maxValue
    while (niceMax <= maxValue) {
      niceMax = roundUpToNice(niceMax + 1);
    }

    let stepSize = niceMax / 7; // 7 intervals for 8 ticks

    // Round stepSize to nice number
    const stepPower = Math.floor(Math.log10(stepSize));
    const stepBase = Math.pow(10, stepPower);

    if (stepSize <= stepBase * 1) stepSize = stepBase;
    else if (stepSize <= stepBase * 1.5) stepSize = stepBase * 1.5;
    else if (stepSize <= stepBase * 2) stepSize = stepBase * 2;
    else if (stepSize <= stepBase * 2.5) stepSize = stepBase * 2.5;
    else if (stepSize <= stepBase * 3) stepSize = stepBase * 3;
    else if (stepSize <= stepBase * 4) stepSize = stepBase * 4;
    else if (stepSize <= stepBase * 5) stepSize = stepBase * 5;
    else stepSize = stepBase * 10;

    // Generate exactly 8 ticks
    const ticks = [];
    for (let i = 0; i <= niceMax && ticks.length < 8; i += stepSize) {
      ticks.push(i);
    }

    while (ticks.length < 8) {
      ticks.push(ticks[ticks.length - 1] + stepSize);
    }

    if (ticks.length > 8) {
      ticks.splice(8);
    }
    return {
      ticks,
      stepSize,
      min: 0,
      max: ticks[ticks.length - 1],
    };
  }

  return {
    leftAxis: calculateNiceScale(leftAxisData),
    rightAxis: calculateNiceScale(rightAxisData),
  };
}

export const renderTooltipContent = (imgCategory: FinancialData["category"]) => {
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
  return tableBody;
};

export const renderTooltip = (content: string, x: number, y: number): HTMLDivElement => {
  const newItem = document.createElement("div");
  newItem.innerHTML = content;
  newItem.style.position = "absolute";
  newItem.style.zIndex = "1";
  newItem.style.left = x + "px";
  newItem.style.top = y + "px";
  newItem.style.pointerEvents = "none";
  newItem.style.transform = "translate(-50%, -100%)";
  return newItem
}