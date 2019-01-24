import { get, post } from "../../utils/request";

// 获取API查询推荐参数（已完成） （普通用户）

// 获取地区信息
const getHousePosition = data => get("/house/getPosition", data);
// 获取各区表格信息
const getHouseData = data => post("/house/getData", data);
// 获取各区图表信息
const getChartData = data => post("/house/getChartData", data);

export default {
  getHousePosition,
  getHouseData,
  getChartData
};
