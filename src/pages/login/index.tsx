import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Alert, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { LoginData } from './data.d';
import { ModelState } from './model';
import styles from './style.less';

interface LoginProps {
  dispatch: Dispatch<any>;
  status?: 'ok' | 'error';
  loading: boolean;
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
  const { dispatch, status, loading } = props;

  const handleSubmit = (values: LoginData) => {
    dispatch({
      type: 'login/fetchLogin',
      payload: values,
    })
  };

  return (
    <div className={styles.login}>
      {status === 'error' && !loading && (
        <LoginMessage content={formatMessage({ id: 'login.error' })} />
      )}
      <Form onFinish={values => handleSubmit(values as LoginData)}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'login.userName.role-required' }),
            },
            {
              len: 15,
              message: formatMessage({ id: 'login.userName.role-len' }),
            },
          ]}
        >
          <Input
            size='large'
            placeholder={formatMessage({ id: 'login.userName.placeholder' })}
            prefix={<UserOutlined className={styles.prefixIcon} />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'login.password.role-required' }),
            },
          ]}
        >
          <Input.Password
            size='large'
            placeholder={formatMessage({ id: 'login.password.placeholder' })}
            prefix={<LockOutlined className={styles.prefixIcon} />}
          />
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" className={styles.submit} htmlType="submit">
            <FormattedMessage id="login.submit" />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(
  ({ login, loading }: {
    login: ModelState,
    loading: { models: { [key: string]: boolean } };
  }) => ({
    status: login.status,
    loading: loading.models.login,
  }),
)(Login);
