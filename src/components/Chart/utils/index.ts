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
  if (countTickLimit <= 0) {
    return {
      ticks: [],
      gap: 0,
      dataYMinProcessed: 0,
      dataYMaxProcessed: 0,
    };
  }

  let step = Math.ceil(dataYMax / 6.5);
  
  step = Math.ceil(step / 100) * 100;

  const ticks: number[] = [];
  let currentTick = 0;

  for (let i = 0; i < 8; i++) {
    ticks.push(currentTick);
    currentTick += step;
  }

  return {
    ticks: ticks,
    gap: step,
    dataYMinProcessed: ticks[0],
    dataYMaxProcessed: ticks[ticks.length - 1],
  };
  // if (countTickLimit <= 0) {
  //   return {
  //     ticks: [],
  //     gap: 0,
  //     dataYMinProcessed: 0,
  //     dataYMaxProcessed: 0,
  //   };
  // }


  // let step = Math.ceil(dataYMax / 6.5);


  // const pow = Math.floor(Math.log10(step));
  // const base = Math.pow(10, pow);

  // let normalizedStep = step / base;
  // if (normalizedStep <= 2.5) step = 2.5 * base;
  // else if (normalizedStep <= 5) step = 5 * base;
  // else if (normalizedStep <= 7.5) step = 7.5 * base;
  // else step = 10 * base;

  // const roundedMin = 0;
  // const ticks: number[] = [];
  // let currentTick = roundedMin;


  // for (let i = 0; i < 8; i++) {
  //   ticks.push(currentTick);
  //   currentTick += step;
  // }

  // return {
  //   ticks: ticks,
  //   gap: step,
  //   dataYMinProcessed: ticks[0],
  //   dataYMaxProcessed: ticks[ticks.length - 1],
  // };
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
    console.log({
      ticks,
      stepSize: gap,
      min: dataYMinProcessed,
      max: dataYMaxProcessed,
      data,
    });

    return {
      ticks,
      stepSize: gap,
      min: dataYMinProcessed,
      max: dataYMaxProcessed,
    };
  }
  console.log({ leftAxisData });
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
    left: {
      top: "50%",
      left: "100%",
      transform: "translate(0, -10%)",
      rotate: "-90deg",
    },
    right: {
      top: "50%",
      left: "0%",
      transform: "translate(-50%, 50%)",
      rotate: "90deg",
    },
    center: {
      top: "100%",
      left: "50%",
      transform: "translate(-50%, -30%)",
      rotate: "0deg",
    },
  };
  const { top, left, transform, rotate } = alignment
    ? alignments[alignment]
    : alignments.center;
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
      y = isHideAsset
        ? baseY.yMax + heightOfTooltip + BASE_HEIGH_OF_TRIANGLE + 5
        : y;
    } else {
      if (
        sizeOfContainer &&
        x + BASE_WIDTH_OF_TOOLTIP >= (sizeOfContainer.width || 0)
      ) {
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
