import { Reducer } from 'redux';
import { Effect } from 'dva';
import { notification } from 'antd';
import moment from 'moment';
import { SettlePage, SettleQuery, MerSubItem } from './data';
import { querySettle, downloadSettle, getMerSubs } from './service';

export interface StateType {
  page: SettlePage;
  query: SettleQuery;
  merSubs: MerSubItem[];
  downloading: boolean;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchQuery: Effect;
    fetchDownload: Effect;
    fetchMerSubs: Effect;
  };
  reducers: {
    setQuery: Reducer<StateType>;
    setPage: Reducer<StateType>;
    setMerSubs: Reducer<StateType>;
  };
}

const defaultState = {
  page: {
    content: [],
    pageable: {
      pageSize: 10,
      pageNumber: 0,
      sort: [],
    },
    totalPages: 0,
    totalElements: 0,
  },
  query: {
    page: 0,
    size: 10,
    settleDate: moment().endOf('day').add('day', -1).format('YYYYMMDD'),
  },
  merSubs: [],
  downloading: false,
};

const Model: ModelType = {
  namespace: 'settle',
  state: defaultState,
  effects: {
    *fetchQuery({ payload, callback }, { call, put }) {
      try {
        yield put({
          type: 'setQuery',
          payload: payload,
        });
        const response = yield call(querySettle, payload);
        yield put({
          type: 'setPage',
          payload: response,
        });
        if (callback) callback(response);
      } catch (error) { }
    },
    *fetchDownload({ callback }, { call, select }) {
      try {
        const query = yield select((state: any) => state.settle.query)
        const resp = yield call(downloadSettle, query);
        if (resp.status === 200) {
          const content = yield call(() => resp.blob());
          const file = new Blob([content], { type: 'application/vnd.ms-excel' });
          const fileName = resp.headers.get('X-Suggested-Filename');
          if ('download' in document.createElement('a')) {
            // 非IE下载
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(file);
            document.body.appendChild(elink);
            elink.click();
            // 释放URL 对象
            URL.revokeObjectURL(elink.href);
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(file, fileName);
          }
        } else {
          notification.error({
            message: '文件下载失败',
            description: '您的网络发生异常,请稍后再试',
          });
        }
      } catch (error) {
        notification.error({
          message: '文件下载失败',
          description: '您的网络发生异常,请稍后再试',
        });
      }
      if (callback) callback();
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
  },

  reducers: {
    setPage(state, action) {
      return {
        ...(state as StateType),
        page: {
          ...(state as StateType).page,
          ...action.payload
        },
      };
    },
    setQuery(state, action) {
      return {
        ...(state as StateType),
        query: {
          ...(state as StateType).query,
          ...action.payload
        },
      };
    },
    setMerSubs(state, action) {
      return {
        ...(state as StateType),
        merSubs: [...action.payload],
      };
    },
  },
};

export default Model;
