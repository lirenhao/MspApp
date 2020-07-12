import { Reducer } from 'redux';
import { Effect } from 'dva';
import { sendCode, initPwd } from './service';

export interface StateType {
  isSend: boolean;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchCode: Effect;
    fetchInit: Effect;
  };
  reducers: {
    setSend: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'init',

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
    *fetchInit({ payload, callback }, { call }) {
      try {
        yield call(initPwd, payload);
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
