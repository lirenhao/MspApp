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
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };
  return (
    <div className={styles.main}>
      {status === 'error' && loginType === 'account' && !submitting && (
        <LoginMessage content="账户或密码错误（admin/ant.design）" />
      )}
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <UserName
          name="userName"
          placeholder="商户号"
          rules={[
            {
              required: true,
              message: '请输入商户号!',
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
