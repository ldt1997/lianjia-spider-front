import apis from "./houseApi";

const { getHousePosition, getHouseData } = apis;

export default {
  namespace: "house",
  state: {
    positionData: [],
    list: []
  },
  effects: {
    // 获取房源列表
    *getPositionData({ payload }, { call, put }) {
      const { data = [] } = yield call(getHousePosition, payload);
      yield put({ type: "savePosition", payload: data });
    },
    // 获取房源列表
    *getHouseData({ payload }, { call, put }) {
      const { data = [] } = yield call(getHouseData, payload);
      yield put({ type: "save", payload: data });
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
    }
  }
};
