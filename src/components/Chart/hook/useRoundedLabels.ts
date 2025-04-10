import { Plugin } from "chart.js";
import { useContext, useMemo } from "react";
import { Context } from "./useContextChart";
import { CHART_INGREDIENTS } from "../ChartContext";

const useRoundedLabels = (position: CHART_INGREDIENTS) => {
  const Chart = useContext(Context);
  const roundedLabelsPlugin: Plugin = useMemo(() => {
    return {
      id: "roundedLabels",
      beforeDraw(chart) {
        if (!Chart) return;
        const yAxis = position === "left" ? chart.scales.y : chart.scales.y1;
        const ctx = chart.ctx;
        ctx.font = "12px Inter";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        let maxTextWidth = 0;
        const padding = 10;
        yAxis.ticks.forEach((tick) => {
          const tickLabel = yAxis.getLabelForValue(tick.value);
          const textMetrics = ctx.measureText(tickLabel);
          const textWidth = textMetrics.width + padding * 2;
          if (textWidth > maxTextWidth) {
            maxTextWidth = textWidth;
          }
        });
        const widthOfChart = maxTextWidth + 10;
        chart.canvas.style.width = widthOfChart + "px";
        Chart.updateSizeChart(position, widthOfChart + "px");
        yAxis.ticks.forEach((tick, index) => {
          if (position === "right" && index === 0) return;
          const tickLabel = yAxis.getLabelForValue(tick.value);
          // Calculate text width
          const textMetrics = ctx.measureText(tickLabel);
          const textWidth = textMetrics.width + padding * 2;
          const labelY = yAxis.getPixelForValue(tick.value);
          const boxHeight = 20;
          // Adjust x position to align right
          const labelX =
            position === "left" ? widthOfChart - textWidth - 5 : yAxis.right; // Move left by padding amount
          ctx.save();
          ctx.shadowColor = "rgba(0, 0, 0, 0.02)"; // 80% opacity for blur
          ctx.shadowBlur = 0.1; // Adjust blur amount
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.fillStyle = "#FFFFFFCC"; // Your background color
          ctx.beginPath();
          ctx.roundRect(
            labelX, // Position rectangle to the left of the axis
            labelY - boxHeight / 2,
            textWidth,
            boxHeight,
            10
          );
          ctx.fill();
          // Adjust text position
          ctx.fillStyle = position === "left" ? "#C7C7CC" : "#9747FF"; // Text color
          ctx.fillText(
            tickLabel,
            labelX + textWidth / 2, // Center text in box
            labelY
          );
          ctx.restore();
        });
      },
    };
  }, [Chart?.data])
  return { roundedLabelsPlugin };
};

export default useRoundedLabels;
