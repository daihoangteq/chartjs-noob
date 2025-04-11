import { useContext, useMemo } from "react";
import { CHART_INGREDIENTS } from "../ChartContext";
import { ChartData, ChartOptions, ChartType } from "chart.js";
import { Context } from "./useContextChart";
import { calculateDualYAxisTicks } from "../utils";

const useSetupChart = (position: CHART_INGREDIENTS) => {
  const chart = useContext(Context);
  const chartData: ChartData<ChartType> = useMemo(() => {
    if (!chart || !chart.data) return { labels: [], datasets: [] };
    const data = chart.data;
    return {
      labels: data.map((item) => item.age.toString()),
      datasets: [
        {
          type: "line" as const,
          label: "金融資産",
          data: data.map((item) => item.assets),
          borderColor: "#8833FF",
          backgroundColor: "#8833FF",
          yAxisID: "y1",
          tension: 0.4,
          borderWidth: 5,
          borderCapStyle: "round",
          pointRadius: 0,
          pointHoverRadius: 0,
          hidden: position === "center" ? false : true,
        },
        {
          type: "bar" as const,
          label: "支出",
          data: data.map((item) => item.expenses),
          backgroundColor: "#00C75D",
          yAxisID: "y",
          categoryPercentage: 0.6,
          borderRadius: 2,
          barPercentage: 0.8,
          hoverBackgroundColor: "#00C75D",
          hidden: position !== "center" ? true : false,
        },
        {
          type: "bar" as const,
          label: "収入",
          data: data.map((item) => item.income),
          backgroundColor: "#56CCF2",
          yAxisID: "y",
          categoryPercentage: 0.6,
          borderRadius: 2,
          barPercentage: 0.8,
          hoverBackgroundColor: "#56CCF2",
          hidden: position !== "center" ? true : false,
        },
      ],
    };
  }, [chart?.data]);

  const options = useMemo((): ChartOptions<ChartType> => {
    if (!chart || !chart.data || !Array.isArray(chart.data)) return {};
    const data = chart.data;
    return {
      responsive: true,
      maintainAspectRatio: false,
      borderColor: "#F7374F",
      interaction: {
        mode: "index" as const,
        intersect: false,
      },
      layout: {
        padding: {
          left: 0,
          right: position === "right" ? 100 : 0,
          top: 30,
          bottom: 10,
        },
      },
      scales: {
        x: {
          display: true,
          grid: {
            drawBorder: position === "center" ? true : false,
            display: position === "center" ? true : false,
            drawOnChartArea: position === "center" ? false : true,
            offset: false,
          },
          ticks: {
            color: "#666",
            font: {
              size: 12,
            },
            padding: 5,
            callback: (value: number | string): string | number | null | undefined => {
              return position === "center"
                ? chartData.labels
                  ? chartData.labels[value as number] as string
                  : ""
                : "";
            },
          },
        },
        y: {
          beginAtZero: true,
          display: position === "left" ? false : true,
          min: 0,
          max: calculateDualYAxisTicks(
            [
              ...data.map((item) => item.income),
              ...data.map((item) => item.expenses),
            ],
            data.map((item) => item.assets)
          ).leftAxis.max,
          grid: {
            display: position === "center" ? true : false,
            drawTicks: false,
            drawBorder: false,
            color: "#E4E4E4",
            borderDash: [4, 4],
            tickColor: "transparent",
          },
          ticks: {
            display: position === "center" ? false : true,
            maxTicksLimit: 8,
            color: "#666",
            font: {
              size: 12,
            },
            stepSize: calculateDualYAxisTicks(
              [
                ...data.map((item) => item.income),
                ...data.map((item) => item.expenses),
              ],
              data.map((item) => item.assets)
            ).leftAxis.stepSize,
          },
        },
        y1: {
          beginAtZero: true,
          // type: "linear" as const,
          display: position === "left" ? false : true,
          position: "right" as const,
          title: {
            display: false,
          },
          min: 0,
          max: calculateDualYAxisTicks(
            [
              ...data.map((item) => item.income),
              ...data.map((item) => item.expenses),
            ],
            data.map((item) => item.assets)
          ).rightAxis.max,
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: position === "right" ? true : false,
            backdropColor: "#030303",
            color: "#F7374F",
            font: {
              size: 12,
            },
            stepSize: calculateDualYAxisTicks(
              [
                ...data.map((item) => item.income),
                ...data.map((item) => item.expenses),
              ],
              data.map((item) => item.assets)
            ).rightAxis.stepSize,
            padding: 10,
            callback: function (value) {
              return value;
            },
          },
        },
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
      },
    };
  }, [chart?.data]);

  return { chartData, options };
};

export default useSetupChart;
