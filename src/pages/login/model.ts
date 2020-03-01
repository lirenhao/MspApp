import { Effect } from 'dva';
import { Reducer } from 'redux';
import { login, logout } from './service';

export interface ModelState {
  token: string;
  status?: 'ok' | 'error';
}

export interface ModelType {
  namespace: string;
  state: ModelState;
  effects: {
    fetchLogin: Effect;
    fetchLogout: Effect;
  };
  reducers: {
    setToken: Reducer<ModelState>;
    setStatus: Reducer<ModelState>;
  };
}

const defaulState: ModelState = {
  token: '',
}

const Model: ModelType = {
  namespace: 'login',
  state: defaulState,
  effects: {
    *fetchLogin({ payload }, { call, put }) {
      try {
        const token = yield call(login, payload);
        yield put({
          type: 'setToken',
          payload: token,
        });
      } catch (error) {
        yield put({
          type: 'setStatus',
          payload: 'error',
        });
      }
    },
    *fetchLogout(_, { call, put }) {
      try {
        const token = yield call(logout);
        yield put({
          type: 'setToken',
          payload: token,
        });
      } catch (error) {
        yield put({
          type: 'setStatus',
          payload: 'error',
        });
      }
    },
  },
  reducers: {
    setToken(state = defaulState, action) {
      return {
        ...state,
        token: action.payload,
      };
    },
    setStatus(state = defaulState, action) {
      return {
        ...state,
        status: action.payload,
      };
    },
  }
}

export default Model;
