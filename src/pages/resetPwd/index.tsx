import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import router from 'umi/router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Input, Row, Col, Button, Statistic, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { FormattedMessage, formatMessage, getLocale } from 'umi-plugin-react/locale';
import ReCAPTCHA from 'react-google-recaptcha';
import { StateType } from './model';
import { ResetData } from './data';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

interface ResetProps {
  loading: boolean;
  sending: boolean;
  isSend: boolean;
  dispatch: Dispatch<any>;
}

const ResetView: React.FC<ResetProps> = (props) => {
  const { loading, sending, isSend, dispatch } = props;

  const [form] = Form.useForm();

  const handleSubmit = (values: ResetData) => {
    dispatch({
      type: 'reset/fetchReset',
      payload: values,
      callback: () => {
        dispatch({
          type: 'user/setUser',
        });
        router.replace('/');
      }
    })
  };

  const handleSendCode = () => {
    dispatch({
      type: 'reset/fetchCode',
      callback: (result: boolean) => {
        if (result) {
          notification.success({
            message: formatMessage({ id: 'reset.captcha.send.success' }),
          });
        } else {
          notification.error({
            message: formatMessage({ id: 'reset.captcha.send.failed' }),
          });
        }
      }
    })
  };

  return (
    <PageHeaderWrapper pageHeaderRender={() => (<></>)}>
      <Card bordered={false} style={{ marginTop: 40 }}>
        <h1 style={{ textAlign: 'center' }}>{formatMessage({ id: 'reset.title' })}</h1>
        <Form
          size="large" style={{ marginTop: 40 }}
          form={form} {...layout}
          onFinish={values => handleSubmit(values as ResetData)}
        >
          <Form.Item
            name="oldPwd"
            label={formatMessage({ id: 'reset.oldPwd.label' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'reset.oldPwd.role-required' }),
              },
            ]}
          >
            <Input.Password
              placeholder={formatMessage({ id: 'reset.oldPwd.placeholder' })}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="newPwd"
            label={formatMessage({ id: 'reset.newPwd.label' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'reset.newPwd.role-required' }),
              },
              {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
                message: formatMessage({ id: 'reset.newPwd.role-pattern' }),
              },
            ]}
          >
            <Input.Password
              placeholder={formatMessage({ id: 'reset.newPwd.placeholder' })}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="checkPwd"
            label={formatMessage({ id: 'reset.checkPwd.label' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'reset.checkPwd.role-required' }),
              },
              {
                validator: (_, value) => (value === '' || value === form.getFieldValue('newPwd')) ?
                  Promise.resolve() : Promise.reject(formatMessage({ id: 'reset.checkPwd.role-validator' })),
              },
            ]}
          >
            <Input.Password
              placeholder={formatMessage({ id: 'reset.checkPwd.placeholder' })}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="captcha"
            label={formatMessage({ id: 'reset.captcha.label' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'reset.captcha.role-required' }),
              },
            ]}
          >
            <ReCAPTCHA
              size="normal"
              sitekey={process.env.GOOGLE_SITE_KEY || '6Leu2NsUAAAAAFttLaiyEKDu9yLgrYJhN77Ou1ge'}
              hl={getLocale() === 'en-US' ? 'en' : 'zh-CN'}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button block size="large" type="primary" htmlType="submit" loading={loading}>
              <FormattedMessage id="reset.submit" />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageHeaderWrapper>
  )
};

export default connect(
  ({
    reset,
    loading,
  }: {
    reset: StateType,
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    isSend: reset.isSend,
    sending: loading.effects['reset/fetchCode'],
    loading: loading.effects['reset/fetchReset'],
  }),
)(ResetView);
