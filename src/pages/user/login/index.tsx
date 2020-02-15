import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
import { StateType } from '@/models/login';
import styles from './style.less';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import LoginFrom from './components/Login';

const { UserName, Password, Captcha, Submit } = LoginFrom;
interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userLogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = props => {
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: values,
    });
  };
  return (
    <div className={styles.main}>
      {status === 'error' && !submitting && (
        <LoginMessage content="商户号或密码错误" />
      )}
      <LoginFrom onSubmit={handleSubmit}>
        <UserName
          name="userName"
          placeholder="商户号"
          rules={[
            {
              required: true,
              message: '请输入商户号!',
            },
            {
              len: 15,
              message: '商户号必须是15位!',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <Captcha
          name="captcha"
          placeholder="验证码"
          countDown={120}
          getCaptchaButtonText=""
          getCaptchaSecondText="秒"
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
        />
        <div>
          <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
      </LoginFrom>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
