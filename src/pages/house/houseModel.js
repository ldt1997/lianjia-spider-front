import apis from "./houseApi";

const { getHousePosition, getHouseData, getChartData } = apis;

export default {
  namespace: "house",
  state: {
    positionData: [], // 位置列表
    list: [], // 房源列表
    chartData: [] // 图表数据
  },
  effects: {
    // 获取区域列表
    *getPositionData({ payload }, { call, put }) {
      const { data = [] } = yield call(getHousePosition, payload);
      yield put({ type: "savePosition", payload: data });
    },
    // 获取房源列表
    *getHouseData({ payload }, { call, put }) {
      const { data = [] } = yield call(getHouseData, payload);
      yield put({ type: "save", payload: data });
    },
    // 获取图表列表
    *getChartData({ payload }, { call, put }) {
      const { data = [] } = yield call(getChartData, payload);
      yield put({ type: "saveChartData", payload: data });
    }
  },
  reducers: {
    savePosition(state, { payload }) {
      return {
        ...state,
        positionData: payload
      };
    },
    save(state, { payload }) {
      return {
        ...state,
        list: payload
      };
    },
    saveChartData(state, { payload }) {
      return {
        ...state,
        chartData: payload
      };
    }
  }
};
