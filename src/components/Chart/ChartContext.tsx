import React, { useEffect, useState } from "react";
import { Context } from "./hook/useContextChart";
import { IListOfPLugin, IPropsChart } from "./type";
import { sleep } from "./utils";
import { sampleData } from "../../utils";

export type CHART_INGREDIENTS = "left" | "right" | "center";

interface IProps {
  children: React.ReactNode;
  pluginChart: IListOfPLugin["plugins"];
  idChart: IPropsChart["idChart"]
}
const ChartContext: React.FC<IProps> = ({ children, pluginChart, idChart }) => {
  const [leftChartSize, setLeftChartSize] =
    useState<IPropsChart["leftChartSize"]>("");
  const [rightChartSize, setRightChartSize] =
    useState<IPropsChart["rightChartSize"]>("");
  const [centerChartSize, setCenterChartSize] =
    useState<IPropsChart["centerChartSize"]>("");
    const [pendingCalculate, setPendingCalculate] =
    useState<IPropsChart["pendingCalculate"]>(true);
    const [loadingGetData, setLoadingGetData] =
    useState<IPropsChart["loadingGetData"]>(true);
    const [data, setData] = useState<IPropsChart["data"]>([])
  const updateSizeChart = (type: CHART_INGREDIENTS, value: string) => {
    switch (type) {
      case "left":
        setLeftChartSize(value);
        break;
      case "right":
        setRightChartSize(value);
        break;
      case "center":
        setCenterChartSize(value);
        break;
      default:
        break;
    }
  };
  const getData = async () => {
    await sleep(100);
    setData([...sampleData]);
    setLoadingGetData(false)
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if(leftChartSize && rightChartSize && data && !loadingGetData) {
      setPendingCalculate(false);
    }
  }, [leftChartSize, rightChartSize, centerChartSize, data, loadingGetData])
  return (
    <Context
      value={{
        centerChartSize,
        updateSizeChart,
        leftChartSize,
        rightChartSize,
        pendingCalculate,
        loadingGetData,
       data,
       plugins: pluginChart,
       idChart,
      }}
    >
      {children}
    </Context>
  );
};

export default ChartContext;
