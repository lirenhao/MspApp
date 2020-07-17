import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import router from 'umi/router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Input, Row, Col, Button, Statistic, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { StateType } from './model';
import { InitData } from './data';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

interface InitProps {
  loading: boolean;
  sending: boolean;
  isSend: boolean;
  dispatch: Dispatch<any>;
}

const InitView: React.FC<InitProps> = (props) => {
  const { loading, sending, isSend, dispatch } = props;

  const [form] = Form.useForm();

  const handleSubmit = (values: InitData) => {
    dispatch({
      type: 'init/fetchInit',
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
      type: 'init/fetchCode',
      callback: (result: boolean) => {
        if (result) {
          notification.success({
            message: formatMessage({ id: 'init.captcha.send.success' }),
          });
        } else {
          notification.error({
            message: formatMessage({ id: 'init.captcha.send.failed' }),
          });
        }
      }
    })
  };

  return (
    <PageHeaderWrapper pageHeaderRender={() => (<></>)}>
      <Card bordered={false} style={{ marginTop: 40 }}>
        <h1 style={{ textAlign: 'center' }}>{formatMessage({ id: 'init.title' })}</h1>
        <Form
          size="large" style={{ marginTop: 40 }}
          form={form} {...layout}
          onFinish={values => handleSubmit(values as InitData)}
        >
          <Form.Item
            label={formatMessage({ id: 'init.captcha.label' })}
            extra={formatMessage({ id: 'init.captcha.extra' })}
          >
            <Row gutter={8}>
              <Col span={16}>
                <Form.Item
                  name="code"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'init.captcha.role-required' }),
                    },
                    {
                      len: 6,
                      message: formatMessage({ id: 'init.captcha.role-len' }),
                    }
                  ]}
                >
                  <Input placeholder={formatMessage({ id: 'init.captcha.placeholder' })} />
                </Form.Item>
              </Col>
              <Col span={8}>
                {isSend ? (
                  <Statistic.Countdown format="s" suffix="S"
                    value={Date.now() + 1000 * 60}
                    onFinish={() => dispatch({ type: 'init/setSend', payload: false })}
                  />
                ) : (
                    <Button block disabled={isSend} onClick={handleSendCode} loading={sending}>
                      {formatMessage({ id: 'init.captcha.button' })}
                    </Button>
                  )
                }
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            name="newPwd"
            label={formatMessage({ id: 'init.newPwd.label' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'init.newPwd.role-required' }),
              },
              {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
                message: formatMessage({ id: 'init.newPwd.role-pattern' }),
              },
            ]}
          >
            <Input.Password
              placeholder={formatMessage({ id: 'init.newPwd.placeholder' })}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="checkPwd"
            label={formatMessage({ id: 'init.checkPwd.label' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'init.checkPwd.role-required' }),
              },
              {
                validator: (_, value) => (value === '' || value === form.getFieldValue('newPwd')) ?
                  Promise.resolve() : Promise.reject(formatMessage({ id: 'init.checkPwd.role-validator' })),
              },
            ]}
          >
            <Input.Password
              placeholder={formatMessage({ id: 'init.checkPwd.placeholder' })}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button block size="large" type="primary" htmlType="submit" loading={loading}>
              <FormattedMessage id="init.submit" />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageHeaderWrapper>
  )
};

export default connect(
  ({
    init,
    loading,
  }: {
    init: StateType,
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    isSend: init.isSend,
    sending: loading.effects['init/fetchCode'],
    loading: loading.effects['init/fetchInit'],
  }),
)(InitView);
