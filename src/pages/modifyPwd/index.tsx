import React from 'react';
import { router } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Input, Button, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { FormattedMessage, formatMessage, getLocale } from 'umi-plugin-react/locale';
import ReCAPTCHA from 'react-google-recaptcha';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ModifyData } from './data.d';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

interface ModifyPwdProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  modifyPwdState: ModifyData;
}

const ModifyView: React.FC<ModifyPwdProps> = props => {
  const [form] = Form.useForm();
  const { loading } = props;

  const handleSubmit = (values: ModifyData) => {
    const { dispatch } = props;
    dispatch({
      type: 'modifyPwd/fetchModify',
      payload: { ...values },
      callback: (response: any) => {
        if (response !== undefined && response !== null) {
          notification.success({
            message: formatMessage({ id: 'modify.submit.success' }),
          });
          router.goBack();
        } else {
          notification.error({
            message: formatMessage({ id: 'modify.submit.failed' }),
          });
        }
      },
    });
  };

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <h1 style={{ textAlign: 'center' }}>{formatMessage({ id: 'modify.title' })}</h1>
        <Form
          size="large"
          style={{ marginTop: 40 }}
          form={form}
          {...layout}
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
                validator: (_, value) =>
                  value === '' || value === form.getFieldValue('newPwd')
                    ? Promise.resolve()
                    : Promise.reject(formatMessage({ id: 'modify.checkPwd.role-validator' })),
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
              sitekey={process.env.GOOGLE_SITE_KEY || '6Leu2NsUAAAAAFttLaiyEKDu9yLgrYJhN77Ou1ge'}
              hl={getLocale() === 'en-US' ? 'en' : 'zh-CN'}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button block size="large" type="primary" htmlType="submit" loading={loading}>
              <FormattedMessage id="modify.submit" />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    modifyPwdState,
    loading,
  }: {
    modifyPwdState: ModifyData;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    modifyPwdState,
    loading: loading.effects['modifyPwd/fetchModify'],
  }),
)(ModifyView);
