export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
