import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { TransPage, TransQuery } from './data';
import { queryTrans, downloadTrans } from './service';

export interface StateType {
  page: TransPage;
  query: TransQuery;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchQuery: Effect;
    fetchDownload: Effect;
  };
  reducers: {
    setQuery: Reducer<StateType>;
    setPage: Reducer<StateType>;
  };
}

const defaulState = {
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
  },
};

const Model: ModelType = {
  namespace: 'trans',
  state: defaulState,
  effects: {
    *fetchQuery({ payload, callback }, { call, put }) {
      try {
        yield put({
          type: 'setQuery',
          payload: payload,
        });
        const response = yield call(queryTrans, payload);
        yield put({
          type: 'setPage',
          payload: response,
        });
        if (callback) callback(response);
      } catch (error) { }
    },
    *fetchDownload({ payload, callback }, { call, put }) {
      try {
        yield call(downloadTrans);
        if (callback) callback();
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
  },
};

export default Model;
