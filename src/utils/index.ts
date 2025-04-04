import { FinancialData } from "../components/FinancialChart";

export function calculateDualYAxisTicks(
  leftAxisData: number[],
  rightAxisData: number[]
) {
  function calculateNiceScale(data: number[]) {
    console.log({ data });
    // Get max value from data
    const maxValue = Math.max(...data.filter((val) => !isNaN(val)));
    console.log({ maxValue });

    const roundUpToNice = (num: number) => {
      const power = Math.floor(Math.log10(num));
      const base = Math.pow(10, power);
      console.log({ power, base, num });

      // Adjusted multipliers to handle larger numbers better
      if (num <= base * 2) return base * 2;
      if (num <= base * 5) return base * 5;
      if (num <= base * 10) return base * 10;
      return base * 20;
    };

    let niceMax = roundUpToNice(maxValue);
    console.log({ niceMax });

    // Ensure niceMax is always greater than maxValue
    while (niceMax <= maxValue) {
      niceMax = roundUpToNice(niceMax + 1);
    }

    let stepSize = niceMax / 7; // 7 intervals for 8 ticks

    // Round stepSize to nice number
    const stepPower = Math.floor(Math.log10(stepSize));
    const stepBase = Math.pow(10, stepPower);

    // Thêm các mức chia nhỏ hơn và chi tiết hơn
    if (stepSize <= stepBase * 1) stepSize = stepBase; // Ví dụ: 1000
    else if (stepSize <= stepBase * 1.5)
      stepSize = stepBase * 1.5; // Ví dụ: 1500
    else if (stepSize <= stepBase * 2) stepSize = stepBase * 2; // Ví dụ: 2000
    else if (stepSize <= stepBase * 2.5)
      stepSize = stepBase * 2.5; // Ví dụ: 2500
    else if (stepSize <= stepBase * 3) stepSize = stepBase * 3; // Ví dụ: 3000
    else if (stepSize <= stepBase * 4) stepSize = stepBase * 4; // Ví dụ: 4000
    else if (stepSize <= stepBase * 5) stepSize = stepBase * 5; // Ví dụ: 5000
    else stepSize = stepBase * 10; // Ví dụ: 10000
    // const stepPower = Math.floor(Math.log10(stepSize));
    // const stepBase = Math.pow(10, stepPower);

    // if (stepSize <= stepBase * 2) stepSize = stepBase * 2;
    // else if (stepSize <= stepBase * 5) stepSize = stepBase * 5;
    // else stepSize = stepBase * 10;

    // Generate exactly 8 ticks
    const ticks = [];
    for (let i = 0; i <= niceMax && ticks.length < 8; i += stepSize) {
      ticks.push(i);
    }

    // Fill remaining ticks if needed
    while (ticks.length < 8) {
      ticks.push(ticks[ticks.length - 1] + stepSize);
    }

    // Trim to exactly 8 ticks
    if (ticks.length > 8) {
      ticks.splice(8);
    }
    console.log(ticks);
    return {
      ticks,
      stepSize,
      min: 0,
      max: ticks[ticks.length - 1],
    };
  }
  console.log();

  return {
    leftAxis: calculateNiceScale(leftAxisData),
    rightAxis: calculateNiceScale(rightAxisData),
  };
}

// Example data
export const sampleData: FinancialData[] = [
  { age: 10, income: 1200, expenses: 1000, assets: 2000 },
  { age: 20, income: 1200, expenses: 1000, assets: 2000 },
  { age: 30, income: 12020, expenses: 1000, assets: 2000 },
  { age: 40, income: 800, expenses: 800, assets: 1000 },
  { age: 50, income: 1230, expenses: 500, assets: 2000 },
  { age: 60, income: 900, expenses: 2000, assets: 7777 },
  { age: 70, income: 1000, expenses: 6900, assets: 1000 },
  { age: 80, income: 548, expenses: 9000, assets: 5000 },
  { age: 90, income: 1000, expenses: 1020, assets: 2000 },
  { age: 100, income: 1000, expenses: 1000, assets: 20000 },
];
// export const sampleData: FinancialData[] = [
//   { age: 30, income: 500, expenses: 400, assets: 300 },
//   { age: 40, income: 800, expenses: 600, assets: 1000 },
//   { age: 50, income: 1000, expenses: 700, assets: 2000 },
//   { age: 60, income: 900, expenses: 600, assets: 3500 },
//   { age: 70, income: 700, expenses: 500, assets: 4500 },
//   { age: 80, income: 500, expenses: 400, assets: 5000 },
// ];

// const leftAxisData = [
//   ...sampleData.map((item) => item.income),
//   ...sampleData.map((item) => item.expenses),
// ];
// const rightAxisData = sampleData.map((item) => item.assets);

// const axesConfig = calculateDualYAxisTicks(leftAxisData, rightAxisData);
// console.log(axesConfig);
