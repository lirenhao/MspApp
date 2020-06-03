import { Reducer } from 'redux';
import { Effect } from 'dva';
import { notification } from 'antd';
import { MerSubItem, Query, Result } from './data.d';
import { getResult, getMerSubs, generPdf } from './service';

type Current = 'query' | 'result';

export interface StateType {
  current: Current;
  merSubs: MerSubItem[];
  query: Query;
  result: Partial<Result>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchResult: Effect;
    fetchMerSubs: Effect;
    fetchDownload: Effect;
  };
  reducers: {
    setMerSubs: Reducer<StateType>;
    setCurrent: Reducer<StateType>;
    setQuery: Reducer<StateType>;
    setResult: Reducer<StateType>;
  };
}

const defaultState = {
  current: 'query' as Current,
  merSubs: [],
  query: {
    merNo: '',
    settleDate: [],
  },
  result: {
  },
}

const Model: ModelType = {
  namespace: 'eState',

  state: defaultState,

  effects: {
    *fetchResult({ payload }, { call, put }) {
      try {
        yield put({
          type: 'setQuery',
          payload,
        });
        const response = yield call(getResult, payload);
        yield put({
          type: 'setResult',
          payload: response,
        });
        yield put({
          type: 'setCurrent',
          payload: 'result',
        });
      } catch (error) { }
    },
    *fetchMerSubs({ payload, callback }, { call, put }) {
      try {
        yield put({
          type: 'setQuery',
          payload: payload,
        });
        const response = yield call(getMerSubs);
        yield put({
          type: 'setMerSubs',
          payload: response,
        });
        if (callback) callback(response);
      } catch (error) { }
    },
    *fetchDownload({ payload, callback }, { call, select }) {
      try {
        const query = yield select((state: any) => state.eState.result)
        const content = yield call(generPdf, query);
        const file = new Blob([content], { type: 'application/pdf' });
        if ('download' in document.createElement('a')) {
          // 非IE下载
          const elink = document.createElement('a');
          elink.download = payload.fileName;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(file);
          document.body.appendChild(elink);
          elink.click();
          // 释放URL 对象
          URL.revokeObjectURL(elink.href);
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(file, payload.fileName);
        }
      } catch (error) {
        console.log(error)
        notification.error({
          message: '文件下载失败',
          description: '您的网络发生异常,请稍后再试',
        });
      }
      if (callback) callback();
    },
  },

  reducers: {
    setMerSubs(state, action) {
      return {
        ...(state as StateType),
        merSubs: [
          ...action.payload
        ],
      };
    },
    setCurrent(state, { payload }) {
      return {
        ...(state as StateType),
        current: payload,
      };
    },
    setQuery(state, { payload }) {
      return {
        ...(state as StateType),
        query: {
          ...(state as StateType).query,
          ...payload,
        },
      };
    },
    setResult(state, { payload }) {
      return {
        ...(state as StateType),
        result: payload,
      };
    },
  },
};

export default Model;
