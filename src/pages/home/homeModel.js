import apis from "./homeApi";

const {
  getOverviewData,
  getDonutData,
  getDonutData1,
  getDonutData2,
  getDonutData3,
  getDonutData4,
  getTreemapData,
  getStackedData,
  getLineChartData,
  getDecorPriceData,
  getDecorBoxData
} = apis;

export default {
  namespace: "home",
  state: {
    overviewData: {}, // 概览数据
    donutData1: [], // 饼图数据（按区块）
    donutData2: [], // 饼图数据（按户型）
    donutData3: [], // 饼图数据（按价格）
    donutData4: [], // 饼图数据（按面积）
    donutData5: [], // 饼图数据（按电梯）
    donutData6: [], // 饼图数据（按朝向）
    donutData7: [], // 饼图数据（按装修）
    treemapData: {}, // 树图图数据
    stackedData: [], // 条形图数据
    lineChartData: [] // 折线图数据
  },
  effects: {
    // 获取概览数据
    *getOverviewData({ payload }, { call, put }) {
      const { data = {} } = yield call(getOverviewData, payload);
      yield put({ type: "saveOverviewData", payload: data });
    },
    // 获取饼图数据
    *getDonutData({ payload }, { call, put }) {
      const { data = [] } = yield call(getDonutData, payload);
      const { filterData = [] } = data;
      switch (payload.type) {
        case 5:
          yield put({ type: "saveDonutData5", payload: filterData });
          break;
        case 6:
          yield put({ type: "saveDonutData6", payload: filterData });
          break;
        case 7:
          yield put({ type: "saveDonutData7", payload: filterData });
          break;
        default:
          yield put({ type: "saveDonutData5", payload: filterData });
          break;
      }
    },
    // 获取饼图数据
    *getDonutData1({ payload }, { call, put }) {
      const { data = [] } = yield call(getDonutData1, payload);
      const { filterData = [] } = data;
      yield put({ type: "saveDonutData1", payload: filterData });
    },
    // 获取饼图数据
    *getDonutData2({ payload }, { call, put }) {
      const { data = [] } = yield call(getDonutData2, payload);
      const { filterData = [] } = data;
      yield put({ type: "saveDonutData2", payload: filterData });
    },
    // 获取饼图数据
    *getDonutData3({ payload }, { call, put }) {
      const { data = [] } = yield call(getDonutData3, payload);
      const { filterData = [] } = data;
      yield put({ type: "saveDonutData3", payload: filterData });
    },
    // 获取饼图数据
    *getDonutData4({ payload }, { call, put }) {
      const { data = [] } = yield call(getDonutData4, payload);
      const { filterData = [] } = data;
      yield put({ type: "saveDonutData4", payload: filterData });
    },
    // 获取矩形树图图数据
    *getTreemapData({ payload }, { call, put }) {
      const { data = [] } = yield call(getTreemapData, payload);
      const { filterData = {} } = data;
      yield put({ type: "saveTreemapData", payload: filterData });
    },
    // 获取条形图数据
    *getStackedData({ payload }, { call, put }) {
      const { data = [] } = yield call(getStackedData, payload);
      const { filterData = [] } = data;
      yield put({ type: "saveStackedData", payload: filterData });
    },
    // 获取折线图数据
    *getLineChartData({ payload }, { call, put }) {
      const { data = [] } = yield call(getLineChartData, payload);
      const { filterData = [] } = data;
      yield put({ type: "saveLineChartData", payload: filterData });
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
    saveOverviewData(state, { payload }) {
      return {
        ...state,
        overviewData: payload
      };
    },
    saveDonutData1(state, { payload }) {
      return {
        ...state,
        donutData1: payload
      };
    },
    saveDonutData2(state, { payload }) {
      return {
        ...state,
        donutData2: payload
      };
    },
    saveDonutData3(state, { payload }) {
      return {
        ...state,
        donutData3: payload
      };
    },
    saveDonutData4(state, { payload }) {
      return {
        ...state,
        donutData4: payload
      };
    },
    saveDonutData5(state, { payload }) {
      return {
        ...state,
        donutData5: payload
      };
    },
    saveDonutData6(state, { payload }) {
      return {
        ...state,
        donutData6: payload
      };
    },
    saveDonutData7(state, { payload }) {
      return {
        ...state,
        donutData7: payload
      };
    },
    saveTreemapData(state, { payload }) {
      return {
        ...state,
        treemapData: payload
      };
    },
    saveStackedData(state, { payload }) {
      return {
        ...state,
        stackedData: payload
      };
    },
    saveLineChartData(state, { payload }) {
      return {
        ...state,
        lineChartData: payload
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
