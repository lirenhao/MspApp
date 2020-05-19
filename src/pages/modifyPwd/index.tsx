import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Input, Button, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { ModifyData } from './data';
import { modifyPwd } from './service';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ModifyView: React.FC<{}> = () => {

  const handleSubmit = async (values: ModifyData) => {
    try {
      await modifyPwd(values);
      notification.success({
        message: formatMessage({ id: 'modify.submit.success' }),
      });
    } catch (error) {
      notification.error({
        message: formatMessage({ id: 'modify.submit.failed' }),
      });
    }
  };

  return (
    <PageHeaderWrapper>
      <Form {...layout} onFinish={values => handleSubmit(values as ModifyData)}>
        <Form.Item
          name="oldPwd"
          label={formatMessage({ id: 'modify.oldPwd.label' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'modify.oldPwd.role-required' }),
            },
          ]}
        >
          <Input.Password
            placeholder={formatMessage({ id: 'modify.oldPwd.placeholder' })}
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item
          name="newPwd"
          label={formatMessage({ id: 'modify.newPwd.label' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'modify.newPwd.role-required' }),
            },
          ]}
        >
          <Input.Password
            placeholder={formatMessage({ id: 'modify.newPwd.placeholder' })}
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item
          name="checkPwd"
          label={formatMessage({ id: 'modify.checkPwd.label' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'modify.checkPwd.role-required' }),
            },
          ]}
        >
          <Input.Password
            placeholder={formatMessage({ id: 'modify.checkPwd.placeholder' })}
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item  {...tailLayout}>
          <Button size="large" type="primary" htmlType="submit">
            <FormattedMessage id="modify.submit" />
          </Button>
        </Form.Item>
      </Form>
    </PageHeaderWrapper>
  )
};

export default ModifyView;
