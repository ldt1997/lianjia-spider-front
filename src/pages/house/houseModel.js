import apis from "./houseApi";

const {
  getHousePosition,
  getOverviewData,
  getTableData,
  getDonutData,
  getBarChartData,
  getRankData,
  getCurvedLineChartData,
  getDecorPriceData,
  getDecorBoxData
} = apis;

export default {
  namespace: "house",
  state: {
    positionData: [], // 位置列表
    overviewData: {}, // 概览数据
    list: [], // 房源列表
    DonutData1: [], // 饼图数据（按电梯）
    DonutData2: [], // 饼图数据（按户型）
    DonutData3: [], // 饼图数据（按朝向）
    DonutData4: [], // 饼图数据（按装修）
    barChartData: [], // 柱状图数据
    rankData: [], // 排名数据
    curvedLineChartData: [], // 曲线折线图数据
    decorPriceData: [], // 装修直方图
    decorBoxData: [] // 装修盒形图
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
        case 3:
          yield put({ type: "saveDonutData3", payload: filterData });
          break;
        case 4:
          yield put({ type: "saveDonutData4", payload: filterData });
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
    },
    // 获取曲线折线图数据
    *getCurvedLineChartData({ payload }, { call, put }) {
      const { data = [] } = yield call(getCurvedLineChartData, payload);
      const { filterData = [] } = data;
      yield put({ type: "saveCurvedLineChartData", payload: filterData });
    },
    // 获取装修直方图
    *getDecorPriceData({ payload }, { call, put }) {
      const { data = [] } = yield call(getDecorPriceData, payload);
      const { filterData = [] } = data;
      yield put({ type: "saveDecorPriceData", payload: filterData });
    },
    // 获取箱型图数据
    *getDecorBoxData({ payload }, { call, put }) {
      const { data = [] } = yield call(getDecorBoxData, payload);
      const { filterData = [] } = data;
      yield put({ type: "saveDecorBoxData", payload: filterData });
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
    saveDonutData3(state, { payload }) {
      return {
        ...state,
        DonutData3: payload
      };
    },
    saveDonutData4(state, { payload }) {
      return {
        ...state,
        DonutData4: payload
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
    },
    saveCurvedLineChartData(state, { payload }) {
      return {
        ...state,
        curvedLineChartData: payload
      };
    },
    saveDecorPriceData(state, { payload }) {
      return {
        ...state,
        decorPriceData: payload
      };
    },
    saveDecorBoxData(state, { payload }) {
      return {
        ...state,
        decorBoxData: payload
      };
    }
  }
};
