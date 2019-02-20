import { get, post } from "../../utils/request";

// 获取API查询推荐参数（已完成） （普通用户）

// 获取概览数据
const getOverviewData = data => post("/home/searchOverviewData", data);
// 获取饼图数据
const getDonutData = data => post("/home/searchDonutData", data);
// 获取矩形树图数据
const getTreemapData = data => post("/home/searchTreemapData", data);
// 获取堆叠条形图数据（各区价格区间）
const getStackedData = data => post("/home/searchStackedData", data);

export default {
  getOverviewData,
  getDonutData,
  getTreemapData,
  getStackedData
};
