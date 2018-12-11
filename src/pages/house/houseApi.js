import { get } from "../../utils/request";

// 获取API查询推荐参数（已完成） （普通用户）

const getHousePosition = data => get("/house/getPosition", data);
const getHouseData = data => get("/house/getData", data);

export default {
  getHousePosition,
  getHouseData
};
