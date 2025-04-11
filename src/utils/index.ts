import { FinancialData } from "../components/Left";
export const imgPath =
  "https://images.unsplash.com/photo-1733503711059-acde98cd7fdf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
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
  { age: 10, income: 1200, expenses: 1000, assets: 2000, category: [imgPath] },
  { age: 20, income: 1200, expenses: 1000, assets: 2000, category: [imgPath] },
  { age: 30, income: 12020, expenses: 1000, assets: 2000, category: [imgPath] },
  { age: 40, income: 800, expenses: 800, assets: 1000, category: [imgPath] },
  { age: 50, income: 1230, expenses: 500, assets: 2000, category: [imgPath] },
  { age: 60, income: 900, expenses: 2000, assets: 7777, category: [imgPath] },
  {
    age: 70,
    income: 100000,
    expenses: 690000,
    assets: 10000,
    category: [imgPath],
  },
  { age: 80, income: 548, expenses: 9000, assets: 5000, category: [imgPath] },
  { age: 90, income: 1000, expenses: 1020, assets: 2000, category: [imgPath] },
  {
    age: 100,
    income: 1000,
    expenses: 1000,
    assets: 10000,
    category: [imgPath],
  },
];

export const sampleData2: FinancialData[] = [
  { age: 30, income: 500, expenses: 400, assets: 300, category: [imgPath] },
  { age: 40, income: 800, expenses: 600, assets: 1000, category: [imgPath] },
  { age: 50, income: 1000, expenses: 700, assets: 2000, category: [imgPath] },
  { age: 60, income: 900, expenses: 600, assets: 3500, category: [imgPath] },
  { age: 70, income: 700, expenses: 500, assets: 4500, category: [imgPath] },
  { age: 80, income: 500, expenses: 400, assets: 5000, category: [imgPath] },
  { age: 90, income: 500, expenses: 400, assets: 5000, category: [imgPath] },
  { age: 100, income: 500, expenses: 400, assets: 5000, category: [imgPath] },
];
export const sampleData3: FinancialData[] = [
  { age: 15, income: 1500, expenses: 1200, assets: 3000, category: [imgPath] },
  { age: 25, income: 2500, expenses: 2000, assets: 5000, category: [imgPath] },
  {
    age: 35,
    income: 30000,
    expenses: 1500,
    assets: 15000,
    category: [imgPath],
  },
  { age: 45, income: 2000, expenses: 1800, assets: 4000, category: [imgPath] },
  { age: 55, income: 5000, expenses: 3000, assets: 10000, category: [imgPath] },
  { age: 65, income: 1200, expenses: 2500, assets: 8000, category: [imgPath] },
  {
    age: 75,
    income: 150000,
    expenses: 100000,
    assets: 20000,
    category: [imgPath],
  },
  { age: 85, income: 700, expenses: 5000, assets: 6000, category: [imgPath] },
  { age: 95, income: 1200, expenses: 1100, assets: 3000, category: [imgPath] },
  {
    age: 105,
    income: 2000,
    expenses: 2000,
    assets: 15000,
    category: [imgPath],
  },
];
const sampleData4: FinancialData[] = [
  { age: 10, income: 1200, expenses: 1000, assets: 2000, category: [imgPath] },
  { age: 20, income: 1200, expenses: 1000, assets: 2000, category: [imgPath] },
  { age: 30, income: 12020, expenses: 1000, assets: 2000, category: [imgPath] },
  { age: 40, income: 800, expenses: 800, assets: 1000, category: [imgPath] },
  { age: 50, income: 1230, expenses: 500, assets: 2000, category: [imgPath] },
  { age: 60, income: 900, expenses: 2000, assets: 7777, category: [imgPath] },
  {
    age: 70,
    income: 100000,
    expenses: 690000,
    assets: 10000,
    category: [imgPath],
  },
  { age: 80, income: 548, expenses: 9000, assets: 5000, category: [imgPath] },
  { age: 90, income: 1000, expenses: 1020, assets: 2000, category: [imgPath] },
  {
    age: 100,
    income: 1000,
    expenses: 1000,
    assets: 10000,
    category: [imgPath],
  },

  // Additional cases
  { age: 15, income: 0, expenses: 100, assets: 50, category: [imgPath] }, // Young person, no income
  { age: 25, income: 3000, expenses: 1500, assets: 8000, category: [imgPath] }, // Starting career
  { age: 35, income: 7000, expenses: 4000, assets: 30000, category: [imgPath] }, // Mid-career growth
  {
    age: 45,
    income: 10000,
    expenses: 9000,
    assets: 50000,
    category: [imgPath],
  }, // High income, high expenses
  { age: 55, income: 5000, expenses: 4500, assets: 80000, category: [imgPath] }, // Slowing down
  { age: 65, income: 0, expenses: 2500, assets: 150000, category: [imgPath] }, // Retired
  { age: 75, income: 300, expenses: 2200, assets: 100000, category: [imgPath] }, // Low income, living off assets
  { age: 85, income: 500, expenses: 1500, assets: 30000, category: [imgPath] }, // Elderly with declining assets
  { age: 95, income: 100, expenses: 500, assets: 5000, category: [imgPath] }, // Near end of life
  { age: 105, income: 50, expenses: 50, assets: 1000, category: [imgPath] }, // Just in case 😉
];
export const sampleData5: FinancialData[] = [
  // Existing 20 entries...

  // More varied samples
  { age: 12, income: 0, expenses: 0, assets: 1000, category: [imgPath] }, // Gifted savings
  { age: 18, income: 100.5, expenses: 11.5, assets: -500, category: [imgPath] }, // Starting out with debt
  { age: 22, income: 2500, expenses: 2000, assets: 3000, category: [imgPath] }, // Student with part-time job
  { age: 28, income: 4500, expenses: 3500, assets: 10000, category: [imgPath] }, // Early professional
  {
    age: 38,
    income: 15000,
    expenses: 5000,
    assets: 150000,
    category: [imgPath],
  }, // High earner, aggressive saver
  { age: 48, income: 4000, expenses: 6000, assets: 20000, category: [imgPath] }, // Financial stress
  {
    age: 58,
    income: 7000,
    expenses: 4000,
    assets: 300.999,
    category: [imgPath],
  }, // Late-career success
  {
    age: 68,
    income: 2000,
    expenses: 3000,
    assets: 2500000,
    category: [imgPath, imgPath],
  }, // Retirement drawdown
  { age: 78, income: 0, expenses: 2500, assets: 120000, category: [imgPath] }, // Living on savings
  {
    age: 88,
    income: 0,
    expenses: 1000,
    assets: 0,
    category: [imgPath, imgPath],
  }, // Out of assets
];
export const sampleData6: FinancialData[] = [
  {
    age: 35,
    income: 2000,
    expenses: 1800,
    assets: 2500000,
    category: [imgPath],
  }, // Early investor
  {
    age: 40,
    income: 1500,
    expenses: 1200,
    assets: 400000,
    category: [imgPath],
  }, // Inherited wealth
  {
    age: 45,
    income: 3000,
    expenses: 2500,
    assets: 600000,
    category: [imgPath],
  }, // High assets, modest lifestyle
  { age: 50, income: 1000, expenses: 800, assets: 750000, category: [imgPath] }, // Frugal millionaire
  { age: 55, income: 500, expenses: 1000, assets: 900000, category: [imgPath] }, // Low income, wealthy retiree
  {
    age: 60,
    income: 800,
    expenses: 1200,
    assets: 1100000,
    category: [imgPath],
  }, // Living off investments
  {
    age: 65,
    income: 1200,
    expenses: 1000,
    assets: 1500000,
    category: [imgPath],
  }, // Passive income lifestyle
  {
    age: 70,
    income: 1000,
    expenses: 900,
    assets: 2000000,
    category: [imgPath],
  }, // Rich elder with simple life
  { age: 75, income: 600, expenses: 500, assets: 1800000, category: [imgPath] }, // Minimal income, high net worth
  { age: 80, income: 300, expenses: 400, assets: 2200000, category: [imgPath] }, // Fully retired, strong savings
];
export const sampleData7: FinancialData[] = [
  {
    age: 42,
    income: 1200,
    expenses: 1000,
    assets: 500000,
    category: [imgPath],
  }, // Low spending, good savings
  {
    age: 50,
    income: 1500,
    expenses: 1200,
    assets: 750000,
    category: [imgPath],
  }, // Comfortable lifestyle
  { age: 58, income: 1000, expenses: 800, assets: 950000, category: [imgPath] }, // Approaching retirement
  {
    age: 65,
    income: 600,
    expenses: 1000,
    assets: 1200000,
    category: [imgPath],
  }, // Retired, spending more
  { age: 73, income: 800, expenses: 700, assets: 1600000, category: [imgPath] }, // Living off returns
  { age: 80, income: 500, expenses: 600, assets: 2000000, category: [imgPath] }, // Stable, high net worth
];
export const sampleData8: FinancialData[] = [
  { age: 42, income: 1200, expenses: 1000, assets: 5000, category: [imgPath] }, // Low spending, good savings
  { age: 50, income: 1500, expenses: 1200, assets: 6500, category: [imgPath] }, // Comfortable lifestyle
  { age: 58, income: 1000, expenses: 800, assets: 5500, category: [imgPath] }, // Approaching retirement
  { age: 65, income: 600, expenses: 1000, assets: 1200, category: [imgPath] }, // Retired, spending more
  { age: 73, income: 800, expenses: 700, assets: 1600, category: [imgPath] }, // Living off returns
  { age: 80, income: 500, expenses: 600, assets: 2000, category: [imgPath] }, // Stable, high net worth
];
export const sampleData9: FinancialData[] = [
  { age: 30, income: 3000, expenses: 2000, assets: 10000, category: [imgPath] },
  { age: 31, income: 3200, expenses: 2100, assets: 12000, category: [imgPath] },
  { age: 32, income: 3400, expenses: 2200, assets: 14000, category: [imgPath] },
  { age: 33, income: 3600, expenses: 2300, assets: 16000, category: [imgPath] },
  { age: 34, income: 3800, expenses: 2400, assets: 18000, category: [imgPath] },
  { age: 35, income: 4000, expenses: 2500, assets: 20000, category: [imgPath] },
  { age: 36, income: 4200, expenses: 2600, assets: 23000, category: [imgPath] },
  { age: 37, income: 4400, expenses: 2700, assets: 26000, category: [imgPath] },
  { age: 38, income: 4600, expenses: 2800, assets: 29000, category: [imgPath] },
  { age: 39, income: 4800, expenses: 2900, assets: 32000, category: [imgPath] },
  { age: 40, income: 5000, expenses: 3000, assets: 35000, category: [imgPath] },
  { age: 41, income: 5200, expenses: 3100, assets: 38000, category: [imgPath] },
  { age: 42, income: 5400, expenses: 3200, assets: 41000, category: [imgPath] },
  { age: 43, income: 5600, expenses: 3300, assets: 44000, category: [imgPath] },
  { age: 44, income: 5800, expenses: 3400, assets: 47000, category: [imgPath] },
];
export const sampleData10: FinancialData[] = [
  { age: 30, income: 3000, expenses: 2000, assets: 10000, category: [imgPath] },
  {
    age: 31,
    income: 3140,
    expenses: 2100,
    assets: 12000,
    category: [imgPath, imgPath],
  },
];
export const sampleData11: FinancialData[] = [
  { age: 30, income: 3000, expenses: 2000, assets: 10000, category: [imgPath] },
  { age: 31, income: 3020, expenses: 2010, assets: 11000, category: [imgPath] },
  { age: 32, income: 3040, expenses: 2020, assets: 12000, category: [imgPath] },
  { age: 33, income: 3060, expenses: 2030, assets: 13000, category: [imgPath] },
  { age: 34, income: 3080, expenses: 2040, assets: 14000, category: [imgPath] },
  { age: 35, income: 3100, expenses: 2050, assets: 15000, category: [imgPath] },
  { age: 36, income: 3120, expenses: 2060, assets: 16000, category: [imgPath] },
  { age: 37, income: 3140, expenses: 2070, assets: 17000, category: [imgPath] },
  { age: 38, income: 3160, expenses: 2080, assets: 18000, category: [imgPath] },
  { age: 39, income: 3180, expenses: 2090, assets: 19000, category: [imgPath] },
  { age: 40, income: 3200, expenses: 2100, assets: 20000, category: [imgPath] },
  { age: 41, income: 3220, expenses: 2110, assets: 21000, category: [imgPath] },
  { age: 42, income: 3240, expenses: 2120, assets: 22000, category: [imgPath] },
  { age: 43, income: 3260, expenses: 2130, assets: 23000, category: [imgPath] },
  { age: 44, income: 3280, expenses: 2140, assets: 24000, category: [imgPath] },
  { age: 45, income: 3300, expenses: 2150, assets: 25000, category: [imgPath] },
  { age: 46, income: 3320, expenses: 2160, assets: 26000, category: [imgPath] },
  { age: 47, income: 3340, expenses: 2170, assets: 27000, category: [imgPath] },
  { age: 48, income: 3360, expenses: 2180, assets: 28000, category: [imgPath] },
  { age: 49, income: 3380, expenses: 2190, assets: 29000, category: [imgPath] },
  { age: 50, income: 3400, expenses: 2200, assets: 30000, category: [imgPath] },
  { age: 51, income: 3420, expenses: 2210, assets: 31000, category: [imgPath] },
  { age: 52, income: 3440, expenses: 2220, assets: 32000, category: [imgPath] },
  { age: 53, income: 3460, expenses: 2230, assets: 33000, category: [imgPath] },
  { age: 54, income: 3480, expenses: 2240, assets: 34000, category: [imgPath] },
  { age: 55, income: 3500, expenses: 2250, assets: 35000, category: [imgPath] },
  { age: 56, income: 3520, expenses: 2260, assets: 36000, category: [imgPath] },
  { age: 57, income: 3540, expenses: 2270, assets: 37000, category: [imgPath] },
  { age: 58, income: 3560, expenses: 2280, assets: 38000, category: [imgPath] },
  { age: 59, income: 3580, expenses: 2290, assets: 39000, category: [imgPath] },
  { age: 60, income: 3600, expenses: 2300, assets: 40000, category: [imgPath] },
  { age: 61, income: 3620, expenses: 2310, assets: 41000, category: [imgPath] },
  { age: 62, income: 3640, expenses: 2320, assets: 42000, category: [imgPath] },
  { age: 63, income: 3660, expenses: 2330, assets: 43000, category: [imgPath] },
  { age: 64, income: 3680, expenses: 2340, assets: 44000, category: [imgPath] },
  { age: 65, income: 3700, expenses: 2350, assets: 45000, category: [imgPath] },
  { age: 66, income: 3720, expenses: 2360, assets: 46000, category: [imgPath] },
  { age: 67, income: 3740, expenses: 2370, assets: 47000, category: [imgPath] },
  { age: 68, income: 3760, expenses: 2380, assets: 48000, category: [imgPath] },
  { age: 69, income: 3780, expenses: 2390, assets: 49000, category: [imgPath] },
  { age: 70, income: 3800, expenses: 2400, assets: 50000, category: [imgPath] },
  { age: 71, income: 3820, expenses: 2410, assets: 51000, category: [imgPath] },
  { age: 72, income: 3840, expenses: 2420, assets: 52000, category: [imgPath] },
  { age: 73, income: 3860, expenses: 2430, assets: 53000, category: [imgPath] },
  { age: 74, income: 3880, expenses: 2440, assets: 54000, category: [imgPath] },
  { age: 75, income: 3900, expenses: 2450, assets: 55000, category: [imgPath] },
  { age: 76, income: 3920, expenses: 2460, assets: 56000, category: [imgPath] },
  { age: 77, income: 3940, expenses: 2470, assets: 57000, category: [imgPath] },
  { age: 78, income: 3960, expenses: 2480, assets: 58000, category: [imgPath] },
  { age: 79, income: 3980, expenses: 2490, assets: 59000, category: [imgPath] },
  { age: 80, income: 4000, expenses: 2500, assets: 60000, category: [imgPath] },
];

export const sampleDataRandom: FinancialData[] = Array.from(
  { length: 20 },
  (_, index) => ({
    age: Math.floor(Math.random() * 30) + index,
    income: Math.floor(Math.random() * 3000) + index * 20, // Increment income by 20 for each item
    expenses: Math.floor(Math.random() * 4000) + index * 10, // Increment expenses by 10 for each item
    assets: Math.floor(Math.random() * 4000) + index * 1000, // Increment assets by 1000 for each item
    category: Array.from(
      { length: Math.floor(Math.random() * 3) },
      () => imgPath
    ), // Fixed category
  })
);

export const sampleData = sampleData5;

// const leftAxisData = [
//   ...sampleData.map((item) => item.income),
//   ...sampleData.map((item) => item.expenses),
// ];
// const rightAxisData = sampleData.map((item) => item.assets);

// const axesConfig = calculateDualYAxisTicks(leftAxisData, rightAxisData);
// console.log(axesConfig);
