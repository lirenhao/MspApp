import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Input, Row, Col, Button, Statistic, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { ResetData } from './data';
import { resetPwd } from './service';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const ResetView: React.FC<{}> = () => {
  const [isCountdown, setIsCountdown] = React.useState<boolean>(false);

  const [form] = Form.useForm();

  const handleSubmit = async (values: ResetData) => {
    try {
      await resetPwd(values);
      // TODO 修改商户状态
      notification.success({
        message: formatMessage({ id: 'reset.submit.success' }),
      });
    } catch (error) {
      notification.error({
        message: formatMessage({ id: 'reset.submit.failed' }),
      });
    }
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
            label={formatMessage({ id: 'reset.captcha.label' })}
            extra={formatMessage({ id: 'reset.captcha.extra' })}
          >
            <Row gutter={8}>
              <Col span={16}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'reset.captcha.role-required' }),
                    }
                  ]}
                >
                  <Input placeholder={formatMessage({ id: 'reset.captcha.placeholder' })} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Button block disabled={isCountdown} onClick={() => setIsCountdown(true)}>
                  {isCountdown ? (
                    <Statistic.Countdown value={Date.now() + 1000 * 20} format="s" suffix="S" onFinish={() => setIsCountdown(false)} />
                  ) : formatMessage({ id: 'reset.captcha.button' })}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button block size="large" type="primary" htmlType="submit">
              <FormattedMessage id="reset.submit" />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageHeaderWrapper>
  )
};

export default ResetView;
