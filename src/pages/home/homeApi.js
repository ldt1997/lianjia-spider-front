import { get, post } from "../../utils/request";

// 获取API查询推荐参数（已完成） （普通用户）

// 获取概览数据
const getOverviewData = data => post("/home/searchOverviewData", data);
// // 获取饼图数据
// const getDonutData = data => post("/home/searchDonutData", data);
// 获取饼图数据
const getDonutData1 = data => post("/home/searchDonutData1", data);
// 获取饼图数据
const getDonutData2 = data => post("/home/searchDonutData2", data);
// 获取饼图数据
const getDonutData3 = data => post("/home/searchDonutData3", data);
// 获取饼图数据
const getDonutData4 = data => post("/home/searchDonutData4", data);
// 获取矩形树图数据
const getTreemapData = data => post("/home/searchTreemapData", data);
// 获取堆叠条形图数据（各区价格区间）
const getStackedData = data => post("/home/searchStackedData", data);
// 获取折线图数据
const getLineChartData = data => post("/home/searchLineChartData", data);
export default {
  getOverviewData,
  getDonutData1,
  getDonutData2,
  getDonutData3,
  getDonutData4,
  getTreemapData,
  getStackedData,
  getLineChartData
};
