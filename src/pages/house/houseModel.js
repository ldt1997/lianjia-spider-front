import apis from "./houseApi";

const {
  getHousePosition,
  getOverviewData,
  getTableData,
  getDonutData,
  getBarChartData,
  getRankData
} = apis;

export default {
  namespace: "house",
  state: {
    positionData: [], // 位置列表
    overviewData: {}, // 概览数据
    list: [], // 房源列表
    DonutData1: [], // 饼图数据（按小区）
    DonutData2: [], // 饼图数据（按户型）
    barChartData: [], // 柱状图数据
    rankData: [] // 排名数据
  },
  effects: {
    // 获取区域列表
    *getPosition({ payload }, { call, put }) {
      const { data = [] } = yield call(getHousePosition, payload);
      const { list = [] } = data;
      yield put({ type: "savePosition", payload: list });
    },
    // 获取概览数据
    *getOverviewData({ payload }, { call, put }) {
      const { data = {} } = yield call(getOverviewData, payload);
      yield put({ type: "saveOverviewData", payload: data });
    },
    // 获取房源列表
    *getTableData({ payload }, { call, put }) {
      const { data = [] } = yield call(getTableData, payload);
      yield put({ type: "save", payload: data });
    },
    // 获取饼图数据
    *getDonutData({ payload }, { call, put }) {
      const { data = [] } = yield call(getDonutData, payload);
      const { filterData = [] } = data;
      switch (payload.type) {
        case 1:
          yield put({ type: "saveDonutData1", payload: filterData });
          break;
        case 2:
          yield put({ type: "saveDonutData2", payload: filterData });
          break;
        default:
          yield put({ type: "saveDonutData1", payload: filterData });
          break;
      }
    },
    // 获取柱状图数据
    *getBarChartData({ payload }, { call, put }) {
      const { data = [] } = yield call(getBarChartData, payload);
      const { filterData = [] } = data;
      yield put({ type: "saveBarChartData", payload: filterData });
    },
    // 获取排名数据
    *getRankData({ payload }, { call, put }) {
      const { data = [] } = yield call(getRankData, payload);
      const { filterData = [] } = data;
      yield put({ type: "saveRankData", payload: filterData });
    }
  },
  reducers: {
    savePosition(state, { payload }) {
      return {
        ...state,
        positionData: payload
      };
    },
    saveOverviewData(state, { payload }) {
      return {
        ...state,
        overviewData: payload
      };
    },
    save(state, { payload }) {
      return {
        ...state,
        list: payload
      };
    },
    saveDonutData1(state, { payload }) {
      return {
        ...state,
        DonutData1: payload
      };
    },
    saveDonutData2(state, { payload }) {
      return {
        ...state,
        DonutData2: payload
      };
    },
    saveBarChartData(state, { payload }) {
      return {
        ...state,
        barChartData: payload
      };
    },
    saveRankData(state, { payload }) {
      return {
        ...state,
        rankData: payload
      };
    }
  }
};
