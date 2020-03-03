import { Reducer } from 'redux';
import { Effect } from 'dva';
import { MonthSalesData, TopSalesData } from './data';
import { getSalesMonth, getSalesTops } from './service';

export interface ModelState {
  month: MonthSalesData;
  tops: TopSalesData;
}

export interface ModelType {
  namespace: string;
  state: ModelState;
  effects: {
    fetchMonth: Effect;
    fetchTops: Effect;
  };
  reducers: {
    saveMonth: Reducer<ModelState>;
    saveTops: Reducer<ModelState>;
  };
}

const initState = {
  month: {
    month: '',
    mers: 0,
    point: 0,
    revenue: 0,
    trans: 0,
    average: 0,
    target: 0,
    recent: 0,
    pasts: [],
  },
  tops: {
    trans: [],
    revenue: [],
    income: {
      revenue: 0,
      cost: 0,
      grossProfit: 0,
      otherIncome: 0,
      otherExenes: 0,
      ebit: 0,
      interestAndTax: 0,
      netProfit: 0,
    },
  },
};

const Model: ModelType = {
  namespace: 'sales',

  state: initState,

  effects: {
    *fetchMonth({ payload }, { call, put }) {
      const response = yield call(getSalesMonth, payload);
      yield put({
        type: 'saveMonth',
        payload: response,
      });
    },
    *fetchTops(_, { call, put }) {
      const response = yield call(getSalesTops);
      yield put({
        type: 'saveTops',
        payload: response,
      });
    },
  },

  reducers: {
    saveMonth(state, { payload }) {
      return {
        ...(state as ModelState),
        month: payload,
      };
    },
    saveTops(state, { payload }) {
      return {
        ...(state as ModelState),
        tops: payload,
      };
    },
  },
};

export default Model;
