import { FinancialData } from "../components/Left";
export const currencyFormat = (money: number | string) => {
  if (!money) return "0";
  return (+money).toLocaleString("ja-JP");
};
export const handleCalTextWidth = (max: number) => {
  let yStickSpace = 36;
  const padding = 10;
  const maxDataChart = max;
  const valueLabel = currencyFormat(maxDataChart);
  const width = valueLabel.length * 12 + padding * 2;
  console.log(width);
  if (valueLabel.length > 5) {
    yStickSpace = yStickSpace + (valueLabel.length - 5) * 5;
  }
  return yStickSpace;
};

export function calculateDualYAxisTicks(
  leftAxisData: number[],
  rightAxisData: number[]
) {
  function calculateNiceScale(data: number[]) {
    // console.log({ data });
    // Get max value from data
    const maxValue = Math.max(...data.filter((val) => !isNaN(val)));
    // console.log({ maxValue });

    const roundUpToNice = (num: number) => {
      const power = Math.floor(Math.log10(num));
      const base = Math.pow(10, power);
      // console.log({ power, base, num });

      // Adjusted multipliers to handle larger numbers better
      if (num <= base * 2) return base * 2;
      if (num <= base * 5) return base * 5;
      if (num <= base * 10) return base * 10;
      return base * 20;
    };

    let niceMax = roundUpToNice(maxValue);
    // console.log({ niceMax });

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
    // console.log(ticks);
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

// Example data
export const sampleData1: FinancialData[] = [
  { age: 10, income: 1200, expenses: 1000, assets: 2000 },
  { age: 20, income: 1200, expenses: 1000, assets: 2000 },
  { age: 30, income: 12020, expenses: 1000, assets: 2000 },
  { age: 40, income: 800, expenses: 800, assets: 1000 },
  { age: 50, income: 1230, expenses: 500, assets: 2000 },
  { age: 60, income: 900, expenses: 2000, assets: 7777 },
  { age: 70, income: 100000, expenses: 690000, assets: 10000 },
  { age: 80, income: 548, expenses: 9000, assets: 5000 },
  { age: 90, income: 1000, expenses: 1020, assets: 2000 },
  { age: 100, income: 1000, expenses: 1000, assets: 10000 },
];

export const sampleData2: FinancialData[] = [
  { age: 30, income: 500, expenses: 400, assets: 300 },
  { age: 40, income: 800, expenses: 600, assets: 1000 },
  { age: 50, income: 1000, expenses: 700, assets: 2000 },
  { age: 60, income: 900, expenses: 600, assets: 3500 },
  { age: 70, income: 700, expenses: 500, assets: 4500 },
  { age: 80, income: 500, expenses: 400, assets: 5000 },
  { age: 90, income: 500, expenses: 400, assets: 5000 },
  { age: 100, income: 500, expenses: 400, assets: 5000 },
];
export const sampleData3: FinancialData[] = [
  { age: 15, income: 1500, expenses: 1200, assets: 3000 },
  { age: 25, income: 2500, expenses: 2000, assets: 5000 },
  { age: 35, income: 30000, expenses: 1500, assets: 15000 },
  { age: 45, income: 2000, expenses: 1800, assets: 4000 },
  { age: 55, income: 5000, expenses: 3000, assets: 10000 },
  { age: 65, income: 1200, expenses: 2500, assets: 8000 },
  { age: 75, income: 150000, expenses: 100000, assets: 20000 },
  { age: 85, income: 700, expenses: 5000, assets: 6000 },
  { age: 95, income: 1200, expenses: 1100, assets: 3000 },
  { age: 105, income: 2000, expenses: 2000, assets: 15000 },
];
const sampleData4: FinancialData[] = [
  { age: 10, income: 1200, expenses: 1000, assets: 2000 },
  { age: 20, income: 1200, expenses: 1000, assets: 2000 },
  { age: 30, income: 12020, expenses: 1000, assets: 2000 },
  { age: 40, income: 800, expenses: 800, assets: 1000 },
  { age: 50, income: 1230, expenses: 500, assets: 2000 },
  { age: 60, income: 900, expenses: 2000, assets: 7777 },
  { age: 70, income: 100000, expenses: 690000, assets: 10000 },
  { age: 80, income: 548, expenses: 9000, assets: 5000 },
  { age: 90, income: 1000, expenses: 1020, assets: 2000 },
  { age: 100, income: 1000, expenses: 1000, assets: 10000 },

  // Additional cases
  { age: 15, income: 0, expenses: 100, assets: 50 }, // Young person, no income
  { age: 25, income: 3000, expenses: 1500, assets: 8000 }, // Starting career
  { age: 35, income: 7000, expenses: 4000, assets: 30000 }, // Mid-career growth
  { age: 45, income: 10000, expenses: 9000, assets: 50000 }, // High income, high expenses
  { age: 55, income: 5000, expenses: 4500, assets: 80000 }, // Slowing down
  { age: 65, income: 0, expenses: 2500, assets: 150000 }, // Retired
  { age: 75, income: 300, expenses: 2200, assets: 100000 }, // Low income, living off assets
  { age: 85, income: 500, expenses: 1500, assets: 30000 }, // Elderly with declining assets
  { age: 95, income: 100, expenses: 500, assets: 5000 }, // Near end of life
  { age: 105, income: 50, expenses: 50, assets: 1000 }, // Just in case 😉
];
export const sampleData5: FinancialData[] = [
  // Existing 20 entries...

  // More varied samples
  { age: 12, income: 0, expenses: 0, assets: 1000 },              // Gifted savings
  { age: 18, income: 1000, expenses: 1100, assets: -500 },        // Starting out with debt
  { age: 22, income: 2500, expenses: 2000, assets: 3000 },        // Student with part-time job
  { age: 28, income: 4500, expenses: 3500, assets: 10000 },       // Early professional
  { age: 38, income: 15000, expenses: 5000, assets: 150000 },     // High earner, aggressive saver
  { age: 48, income: 4000, expenses: 6000, assets: 20000 },       // Financial stress
  { age: 58, income: 7000, expenses: 4000, assets: 300000 },      // Late-career success
  { age: 68, income: 2000, expenses: 3000, assets: 250000 },      // Retirement drawdown
  { age: 78, income: 0, expenses: 2500, assets: 120000 },         // Living on savings
  { age: 88, income: 0, expenses: 1000, assets: 0 },              // Out of assets
];
export const sampleData6: FinancialData[] = [
  { age: 35, income: 2000, expenses: 1800, assets: 250000 },   // Early investor
  { age: 40, income: 1500, expenses: 1200, assets: 400000 },   // Inherited wealth
  { age: 45, income: 3000, expenses: 2500, assets: 600000 },   // High assets, modest lifestyle
  { age: 50, income: 1000, expenses: 800, assets: 750000 },    // Frugal millionaire
  { age: 55, income: 500, expenses: 1000, assets: 900000 },    // Low income, wealthy retiree
  { age: 60, income: 800, expenses: 1200, assets: 1100000 },   // Living off investments
  { age: 65, income: 1200, expenses: 1000, assets: 1500000 },  // Passive income lifestyle
  { age: 70, income: 1000, expenses: 900, assets: 2000000 },   // Rich elder with simple life
  { age: 75, income: 600, expenses: 500, assets: 1800000 },    // Minimal income, high net worth
  { age: 80, income: 300, expenses: 400, assets: 2200000 },    // Fully retired, strong savings
];
export const sampleData7: FinancialData[] = [
  { age: 42, income: 1200, expenses: 1000, assets: 500000 },   // Low spending, good savings
  { age: 50, income: 1500, expenses: 1200, assets: 750000 },   // Comfortable lifestyle
  { age: 58, income: 1000, expenses: 800, assets: 950000 },    // Approaching retirement
  { age: 65, income: 600, expenses: 1000, assets: 1200000 },   // Retired, spending more
  { age: 73, income: 800, expenses: 700, assets: 1600000 },    // Living off returns
  { age: 80, income: 500, expenses: 600, assets: 2000000 },    // Stable, high net worth
];
export const sampleData8: FinancialData[] = [
  { age: 42, income: 1200, expenses: 1000, assets: 5000 },   // Low spending, good savings
  { age: 50, income: 1500, expenses: 1200, assets: 6500 },   // Comfortable lifestyle
  { age: 58, income: 1000, expenses: 800, assets: 5500 },    // Approaching retirement
  { age: 65, income: 600, expenses: 1000, assets: 1200 },   // Retired, spending more
  { age: 73, income: 800, expenses: 700, assets: 1600 },    // Living off returns
  { age: 80, income: 500, expenses: 600, assets: 2000 },    // Stable, high net worth
];
export const sampleData9: FinancialData[] = [
  { age: 30, income: 3000, expenses: 2000, assets: 10000 },
  { age: 31, income: 3200, expenses: 2100, assets: 12000 },
  { age: 32, income: 3400, expenses: 2200, assets: 14000 },
  { age: 33, income: 3600, expenses: 2300, assets: 16000 },
  { age: 34, income: 3800, expenses: 2400, assets: 18000 },
  { age: 35, income: 4000, expenses: 2500, assets: 20000 },
  { age: 36, income: 4200, expenses: 2600, assets: 23000 },
  { age: 37, income: 4400, expenses: 2700, assets: 26000 },
  { age: 38, income: 4600, expenses: 2800, assets: 29000 },
  { age: 39, income: 4800, expenses: 2900, assets: 32000 },
  { age: 40, income: 5000, expenses: 3000, assets: 35000 },
  { age: 41, income: 5200, expenses: 3100, assets: 38000 },
  { age: 42, income: 5400, expenses: 3200, assets: 41000 },
  { age: 43, income: 5600, expenses: 3300, assets: 44000 },
  { age: 44, income: 5800, expenses: 3400, assets: 47000 },
];

export const sampleData = sampleData9;

// const leftAxisData = [
//   ...sampleData.map((item) => item.income),
//   ...sampleData.map((item) => item.expenses),
// ];
// const rightAxisData = sampleData.map((item) => item.assets);

// const axesConfig = calculateDualYAxisTicks(leftAxisData, rightAxisData);
// console.log(axesConfig);
