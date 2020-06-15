import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Card, Form, Row, Col, Select, DatePicker, Space, Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { FormInstance } from 'antd/lib/form';
import moment from 'moment';
import { UserModelState } from '@/models/user';
import { SettleQuery, MerSubItem } from './data';
import { StateType } from './model';

interface SearchProps {
  dispatch: Dispatch<any>;
  merNo?: string;
  query: SettleQuery;
  merSubs: MerSubItem[];
  form: FormInstance;
}

const DateFormat: React.FC<Record<string, any>> = ({ value, format, onChange, ...rest }) => {
  return (
    <DatePicker {...rest}
      value={value && value !== '' ? moment(value as string, format) : null}
      onChange={date => onChange(date ? date.format(format) : '')}
    />
  )
}

const defaultColConfig = {
  lg: 8,
  md: 12,
  xxl: 8,
  xl: 8,
  sm: 12,
  xs: 24,
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

const SearchView: React.FC<SearchProps> = props => {
  const { dispatch, form, merNo, query, merSubs } = props;

  const handleSubmit = (values: any) => {
    dispatch({
      type: 'settle/fetchQuery',
      payload: {
        ...values,
        page: 0,
        size: query.size,
      },
    })
  }

  return (
    <Card style={{ marginBottom: '20px' }} bodyStyle={{ paddingBottom: 0 }}>
      <Form
        form={form}
        initialValues={{
          ...query,
          merNo,
        }}
        onFinish={handleSubmit}
      >
        <Row gutter={16} justify="start">
          <Col {...defaultColConfig} >
            <Form.Item
              name="merNo" {...layout}
              label={formatMessage({ id: 'settle.merNo.title' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'settle.merNo.required' })
                }
              ]}
            >
              <Select placeholder={formatMessage({ id: 'settle.merNo.placeholder' })}>
                {merSubs?.map(sub => (
                  <Select.Option key={sub.merNo} value={sub.merNo}>{`${sub.merNo}[${sub.merName}]`}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col {...defaultColConfig} >
            <Form.Item
              {...layout} name="settleDate"
              label={formatMessage({ id: 'settle.settleDate.title' })}
            >
              <DateFormat style={{ width: '100%' }} showToday={false} allowClear={false} format="YYYYMMDD"
                placeholder={formatMessage({ id: 'settle.settleDate.placeholder' })}
                disabledDate={(date: moment.Moment) => date && (date >= moment().endOf('day') || date < moment().endOf('day').add('day', -30))}
              />
            </Form.Item>
          </Col>
          <Col {...defaultColConfig} style={{ textAlign: 'right' }}>
            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit">{formatMessage({ id: 'settle.query.submit' })}</Button>
                <Button onClick={() => form.resetFields()}>{formatMessage({ id: 'settle.query.reset' })}</Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default connect(
  ({ user, settle }: {
    user: UserModelState;
    settle: StateType,
    loading: { models: { [key: string]: boolean } };
  }) => ({
    merNo: user.user.merNo,
    query: settle.query,
    merSubs: settle.merSubs,
  }),
)(SearchView);
