import { Plugin } from "chart.js";
import { CHART_INGREDIENTS } from "../ChartContext";
export interface FinancialData {
  age: number;
  income: number;
  expenses: number;
  assets: number;
  category: string[];
}
export interface IPropsChart {
  data: FinancialData[];
  leftChartSize: string;
  rightChartSize: string;
  centerChartSize: string;
  pendingCalculate: boolean;
  loadingGetData: boolean;
}
export interface IActionChart {
  updateSizeChart: (type: CHART_INGREDIENTS, value: string) => void;
}
export interface IListOfPLugin {
  plugins: string[];
}
export interface IPropsContextChart
  extends IPropsChart,
    IActionChart,
    IListOfPLugin {}
