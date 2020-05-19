import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Input, Button, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { ResetData } from './data';
import { resetPwd } from './service';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ResetView: React.FC<{}> = () => {

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
    <PageHeaderWrapper title={formatMessage({ id: 'reset.title' })}>
      <Form {...layout} onFinish={values => handleSubmit(values as ResetData)}>
        <Form.Item
          name="newPwd"
          label={formatMessage({ id: 'reset.newPwd.label' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'reset.newPwd.role-required' }),
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
          ]}
        >
          <Input.Password
            placeholder={formatMessage({ id: 'reset.checkPwd.placeholder' })}
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item  {...tailLayout}>
          <Button size="large" type="primary" htmlType="submit">
            <FormattedMessage id="reset.submit" />
          </Button>
        </Form.Item>
      </Form>
    </PageHeaderWrapper>
  )
};

export default ResetView;
