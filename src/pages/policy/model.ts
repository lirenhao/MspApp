import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { PolicyData } from './data.d';
import { getPolicy, postPolicy } from './service';

export interface StateType {
  policy: PolicyData;
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
    fetchAgree: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'policy',

  state: {
    policy: {
      title: 'BOC Merchant Portal Policy',
      content: '',
    }
  },

  effects: {
    *fetch({ callback }, { call, put }) {
      try {
        const response = yield call(getPolicy);
        yield put({
          type: 'save',
          payload: response,
        });
        if (callback) callback(response);
      } catch (error) { }
    },
    *fetchAgree({ callback }, { call }) {
      try {
        yield call(postPolicy);
        if (callback) callback();
      } catch (error) { }
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
