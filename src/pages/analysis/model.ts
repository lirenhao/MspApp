import { Reducer } from 'redux';
import { Effect } from 'dva';
import { VisitDataType } from './data';
import { fakeChartData } from './service';

export interface StateType {
  salesData: VisitDataType[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    fetchSalesData: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    clear: Reducer<StateType>;
  };
}

const defaultState = {
  salesData: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => ({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  })),
};

const Model: ModelType = {
  namespace: 'analysis',

  state: defaultState,

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return defaultState;
    },
  },
};

export default Model;
