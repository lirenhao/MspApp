import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { MerData } from './data.d';
import { getMerInfo } from './service';

export interface StateType {
  merInfo?: MerData;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'merInfo',

  state: {

  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getMerInfo);
      yield put({
        type: 'save',
        payload: response,
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
  },
};

export default Model;
