import { Reducer } from 'redux';
import { Effect } from 'dva';
import { sendCode, resetPwd } from './service';

export interface StateType {
  isSend: boolean;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchCode: Effect;
    fetchReset: Effect;
  };
  reducers: {
    setSend: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'reset',

  state: {
    isSend: false,
  },

  effects: {
    *fetchCode({ callback }, { call, put }) {
      try {
        const result = yield call(sendCode);
        yield put({
          type: 'setSend',
          payload: result,
        });
        if (callback) callback(result);
      } catch (error) { }
    },
    *fetchReset({ payload, callback }, { call }) {
      try {
        yield call(resetPwd, payload);
        if (callback) callback();
      } catch (error) { }
    },
  },

  reducers: {
    setSend(state, { payload }) {
      return {
        ...state,
        isSend: payload
      };
    },
  },
};

export default Model;
