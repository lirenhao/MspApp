import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getUser, getLogout } from '@/services/user';

export interface User {
  merNo?: string;
  merName?: string;
  // 0-请求中; 00-商户正常; 01-同意协议; 02-重置密码; 03-密码到期
  status?: '0' | '00' | '01' | '02' | '03';
}

export interface UserModelState {
  user: User;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchUser: Effect;
    fetchLogout: Effect;
  };
  reducers: {
    setUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    user: {
      status: '0'
    },
  },

  effects: {
    *fetchUser(_, { call, put }) {
      try {
        const response = yield call(getUser);
        yield put({
          type: 'setUser',
          payload: response,
        });
      } catch (error) {
        // TODO 获取商户信息失败
      }
    },
    *fetchLogout({ callback }, { call }) {
      try {
        yield call(getLogout);
        if (callback) callback();
      } catch (error) { }
    }
  },

  reducers: {
    setUser(state, action) {
      return {
        ...state,
        user: action.payload || {},
      };
    },
  },
};

export default UserModel;
