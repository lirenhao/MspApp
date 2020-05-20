import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Input, Button, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { FormattedMessage, formatMessage, getLocale } from 'umi-plugin-react/locale';
import ReCAPTCHA from 'react-google-recaptcha';
import { ModifyData } from './data';
import { modifyPwd } from './service';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const ModifyView: React.FC<{}> = () => {
  const [form] = Form.useForm();

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
      <Card bordered={false}>
        <h1 style={{ textAlign: 'center' }}>{formatMessage({ id: 'modify.title' })}</h1>
        <Form
          size="large" style={{ marginTop: 40 }}
          form={form} {...layout}
          onFinish={values => handleSubmit(values as ModifyData)}
        >
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
              {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
                message: formatMessage({ id: 'modify.newPwd.role-pattern' }),
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
              {
                validator: (_, value) => (value === '' || value === form.getFieldValue('newPwd')) ?
                  Promise.resolve() : Promise.reject(formatMessage({ id: 'modify.checkPwd.role-validator' })),
              },
            ]}
          >
            <Input.Password
              placeholder={formatMessage({ id: 'modify.checkPwd.placeholder' })}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="captcha"
            label={formatMessage({ id: 'modify.captcha.label' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'modify.captcha.role-required' }),
              },
            ]}
          >
            <ReCAPTCHA
              size="normal"
              sitekey='6Leu2NsUAAAAAFttLaiyEKDu9yLgrYJhN77Ou1ge'
              hl={getLocale() === 'en-US' ? 'en' : 'zh-CN'}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }} {...tailLayout}>
            <Button block size="large" type="primary" htmlType="submit">
              <FormattedMessage id="modify.submit" />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageHeaderWrapper>
  )
};

export default ModifyView;
