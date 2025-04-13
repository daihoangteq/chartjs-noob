import {
  BASE_GAP_OF_CONTENT_TOOLTIP,
  BASE_HEIGH_OF_TRIANGLE,
  BASE_PADDING_X_OF_CONTENT_TOOLTIP,
  BASE_PADDING_Y_OF_CONTENT_TOOLTIP,
  BASE_SIZE_ITEM_OF_TOOLTIP,
  BASE_WIDTH_OF_TOOLTIP,
} from "../constant";
import { FinancialData, ALIGNMENT_OF_TOOLTIP } from "../type";

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getTicksGap = (
  unroundedTickSize: number,
  minRaw: number,
  baseUnit: number,
  newDataYMax: number
) => {
  let x = Math.floor(Math.log10(unroundedTickSize));
  const deltaSteps: number[] = [
    0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9, 1,
  ];
  let roundedTickRange = unroundedTickSize;

  // Find a valid rounded tick range
  loop1: do {
    const pow10x = Math.pow(10, x);
    let temp = unroundedTickSize / pow10x;
    const tempFloor = Math.floor(temp);
    let deltaTemp = temp - tempFloor;

    // Adjust deltaTemp based on predefined steps
    if (deltaTemp > 0) {
      for (const delta of deltaSteps) {
        if (deltaTemp < delta) {
          deltaTemp = delta;
          break;
        }
      }
    }

    temp = tempFloor + deltaTemp;
    roundedTickRange = temp * pow10x;

    const firstLabel =
      (Math.floor(minRaw / roundedTickRange) - 1) * roundedTickRange; // Ensure this is less than dataYMin
    const lastLabel = firstLabel + baseUnit * roundedTickRange;

    if (lastLabel <= newDataYMax * 1.2 && lastLabel >= newDataYMax) {
      break loop1; // Valid tick range found
    }

    x--;
  } while (x > 0);
  const ticks = [];
  const gap = roundedTickRange;
  const firstLabel = Math.floor(minRaw / gap) * gap; // Ensure this is less than dataYMin
  ticks.push(firstLabel);
  let nextLabel = firstLabel;
  for (let index = 1; index <= baseUnit; index++) {
    nextLabel += gap;
    ticks.push(nextLabel);
  }
  return {
    ticks,
    gap: gap,
  };
};
export const getTickValueYAxis = (
  dataYMin: number,
  dataYMax: number,
  countTickLimit = 5
): {
  ticks: number[];
  dataYMinProcessed: number;
  dataYMaxProcessed: number;
  gap: number;
} => {
  const yMin = !isFinite(dataYMin) ? 0 : dataYMin;
  const yMax = !isFinite(dataYMax) ? yMin : dataYMax;
  const baseUnit = countTickLimit - 1; // 5 is default
  let minRaw = yMin === yMax ? 0 : yMin;
  let maxRaw = Math.max(0, yMax);
  let roundNum = 1;
  if (maxRaw - minRaw >= 10_0000 * 10) {
    roundNum = 10_0000;
  } else if (maxRaw - minRaw >= 1_0000 * 20) {
    roundNum = 5_0000;
  } else if (maxRaw - minRaw >= 1_0000) {
    roundNum = 1_0000;
  } else if (maxRaw - minRaw >= 1000) {
    roundNum = 100;
  }
  minRaw = Math.floor(minRaw / roundNum);
  maxRaw = Math.ceil(maxRaw / roundNum);
  const unbufferedRange = maxRaw - minRaw;
  const bufferLabel = unbufferedRange / (baseUnit + 1);
  const newDataYMax = maxRaw + bufferLabel;
  const range = unbufferedRange + bufferLabel;

  // Calculate initial tick size
  const unroundedTickSize = Math.round(range / baseUnit) || 1;
  let { ticks, gap } = getTicksGap(
    unroundedTickSize,
    minRaw,
    baseUnit,
    newDataYMax
  );
  const dataYMaxProcessed = ticks[baseUnit];
  if (maxRaw > dataYMaxProcessed) {
    const buffer = maxRaw - dataYMaxProcessed;
    ticks = ticks.map((tick, index) => tick + index * buffer);
    gap = gap + buffer;
  }

  ticks = ticks.map((tick) => Math.round(tick * roundNum));
  gap = Math.round(gap * roundNum);
  if (gap % 10_0000 !== 0 && roundNum === 10_0000) {
    gap = gap + 5_0000;
  }
  if (ticks[0] % 10_0000 !== 0 && roundNum === 10_0000) {
    ticks[0] = Math.max(ticks[0] - 5_0000, 0);
    ticks = ticks.map((_, index) => ticks[0] + index * gap);
  }
  return {
    ticks: ticks,
    dataYMinProcessed: ticks[0],
    dataYMaxProcessed: ticks[baseUnit],
    gap,
  };
};

export function calculateDualYAxisTicks(
  leftAxisData: number[],
  rightAxisData: number[]
) {
  function calculateNiceScale(data: number[]) {
    // Get max value from data
    const maxValue = Math.max(...data.filter((val) => !isNaN(val)));
    const { dataYMaxProcessed, dataYMinProcessed, gap, ticks } =
      getTickValueYAxis(0, maxValue, 8);

    return {
      ticks,
      stepSize: gap,
      min: dataYMinProcessed,
      max: dataYMaxProcessed,
    };
  }
  const dataReturn = {
    leftAxis: calculateNiceScale(leftAxisData),
    rightAxis: calculateNiceScale(rightAxisData),
  };
  return dataReturn;
}

export const renderTooltipContent = (
  imgCategory: FinancialData["category"],
  alignment?: ALIGNMENT_OF_TOOLTIP
) => {
  const tableBody = `
  <div style="position: relative; border-radius: 20px; background-color: white; filter:drop-shadow(0px 2px 6px #00000040)">
    <div
      style="
        display: flex;
        flex-direction: column;
        position: relative;
        width: 32px;
        z-index: 1;
        padding: ${BASE_PADDING_Y_OF_CONTENT_TOOLTIP}px ${BASE_PADDING_X_OF_CONTENT_TOOLTIP}px;
        border-radius: 20px;
      "
    >
    ${imgCategory
      .map((item) => {
        return `
      <img
          src="${item}"
          style="
              width: ${BASE_SIZE_ITEM_OF_TOOLTIP}px;
              height: ${BASE_SIZE_ITEM_OF_TOOLTIP}px;
              object-fit: cover;
              border-radius: 50%;
              margin: ${BASE_GAP_OF_CONTENT_TOOLTIP}px 0px;
          "
          alt="icon"
      />
  `;
      })
      .join("")}
    </div>
      ${renderTriangle(alignment)}
  </div>
        `;
  return tableBody;
};

export const renderTooltip = (
  content: string,
  x: number,
  y: number
): HTMLDivElement => {
  const newItem = document.createElement("div");
  newItem.innerHTML = content;
  newItem.style.position = "absolute";
  newItem.style.zIndex = "1";
  newItem.style.left = x + "px";
  newItem.style.top = y + "px";
  newItem.style.pointerEvents = "none";
  newItem.style.transform = "translate(-50%, -100%)";
  return newItem;
};
export const renderTriangle = (alignment?: ALIGNMENT_OF_TOOLTIP) => {
  const alignments = {
    left: { top: "50%", left: "100%", transform: "translate(0, -10%)", rotate: "-90deg" },
    right: { top: "50%", left: "0%", transform: "translate(-50%, 50%)", rotate: "90deg" },
    center: { top: "100%", left: "50%", transform: "translate(-50%, -30%)", rotate: "0deg" },
  };
  const { top, left, transform, rotate } = alignment ? alignments[alignment] :alignments.center;
  return `<div
      style="
        top: ${top};
        left: ${left};
        transform: ${transform};
        rotate: ${rotate};
        position: absolute;
        z-index: 0;
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
`;
};
export const calculatePositionOfTooltip = (props: {
  baseX: number;
  baseY: { y: number; yMax: number; yAsset: number };
  numberOfImg: number;
  sizeOfContainer?: { width?: number; height?: number };
  forceCenter?: boolean;
}): { x: number; y: number; alignment: ALIGNMENT_OF_TOOLTIP } => {
  const PADDING_TOP = 15;
  const { baseX, baseY, numberOfImg, sizeOfContainer, forceCenter } = props;

  const heightOfTooltip =
    numberOfImg * BASE_SIZE_ITEM_OF_TOOLTIP +
    BASE_PADDING_Y_OF_CONTENT_TOOLTIP * 2 +
    BASE_GAP_OF_CONTENT_TOOLTIP * numberOfImg * 2;

  let x = baseX;
  let y = baseY.y;
  let alignment: ALIGNMENT_OF_TOOLTIP = "center";

  if (y - heightOfTooltip <= PADDING_TOP) {
    alignment = forceCenter ? "center" : "right";
    y += heightOfTooltip + BASE_HEIGH_OF_TRIANGLE + 5; // extra space

    if (forceCenter) {
      const isHideAsset = y + BASE_HEIGH_OF_TRIANGLE >= baseY.yAsset;
      y = isHideAsset ? baseY.yMax + heightOfTooltip + BASE_HEIGH_OF_TRIANGLE + 5 : y;
    } else {
      if (sizeOfContainer && x + BASE_WIDTH_OF_TOOLTIP >= (sizeOfContainer.width || 0)) {
        x -= BASE_WIDTH_OF_TOOLTIP;
        alignment = "left";
      } else {
        x += BASE_WIDTH_OF_TOOLTIP;
      }
    }
  } else {
    y -= PADDING_TOP;
  }

  return { x, y, alignment };
};
