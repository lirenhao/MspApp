import { Reducer } from 'redux';
import { Effect } from 'dva';
import moment from 'moment';
import { TotalData, MonthData, TopData } from './data';
import { getTotal, getMonths, getTops } from './service';

export interface StateType {
  total: TotalData;
  months: MonthData[];
  tops: TopData[];
}

const defaultState: StateType = {
  total: {
    year: moment().endOf('day').format('YYYY'),
    count: 0,
    trans: 0,
    settle: 0,
  },
  months: [],
  tops: [],
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchTotal: Effect;
    fetchMonths: Effect;
    fetchTops: Effect;
  };
  reducers: {
    setTotal: Reducer<StateType>;
    setMonths: Reducer<StateType>;
    setTops: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'analysis',

  state: defaultState,

  effects: {
    *fetchTotal(_, { call, put }) {
      try {
        const response = yield call(getTotal);
        yield put({
          type: 'setTotal',
          payload: response,
        });
      } catch (error) { }
    },
    *fetchMonths(_, { call, put }) {
      try {
        const response = yield call(getMonths);
        yield put({
          type: 'setMonths',
          payload: response,
        });
      } catch (error) { }
    },
    *fetchTops(_, { call, put }) {
      try {
        const response = yield call(getTops);
        yield put({
          type: 'setTops',
          payload: response,
        });
      } catch (error) { }
    },
  },

  reducers: {
    setTotal(state, { payload }) {
      return {
        ...(state as StateType),
        total: {
          ...(state as StateType).total,
          ...payload,
        },
      };
    },
    setMonths(state, { payload }) {
      return {
        ...(state as StateType),
        months: [...payload],
      };
    },
    setTops(state, { payload }) {
      return {
        ...(state as StateType),
        tops: [...payload],
      };
    },
  },
};

export default Model;
