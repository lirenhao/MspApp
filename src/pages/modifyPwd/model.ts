import { Effect } from 'dva';
import { modifyPwd } from './service';
import { ModifyData } from './data.d';

const defaulState: ModifyData = {
  oldPwd: '',
  newPwd: '',
  checkPwd: '',
};

export interface ModelType {
  namespace: string;
  state: ModifyData;
  effects: {
    fetchModify: Effect;
  };
  reducers: {};
}

const Model: ModelType = {
  namespace: 'modifyPwd',
  state: defaulState,
  effects: {
    *fetchModify({ payload, callback }, { call }) {
      try {
        const response = yield call(modifyPwd, payload);
        if (callback && typeof callback === 'function') {
          callback(response);
        }
      } catch (e) {
        callback(undefined);
      }
    },
  },
  reducers: {},
};
export default Model;
